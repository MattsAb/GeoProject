import { Request, Response } from 'express'
import { confirmSignUp, deleteAccount, getMe, login, resendCode, signUp } from '../controllers/authController'
import { cognito } from '../config/cognito';
import { prisma } from '../config/prisma';
import { s3 } from '../config/s3';
import { ServerError } from '../middleware/errorMiddleware';

jest.mock('../config/prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findUnique: jest.fn()
        },
        post: {
            findMany: jest.fn(),
        },
    }
}))

jest.mock('../config/s3', () => ({
  s3: { send: jest.fn() },
}));

jest.mock('../schemas/env', () => ({
  env: {
    DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
    AWS_REGION: 'us-east-1',
    AWS_BUCKET_NAME: 'test-bucket',
    AWS_ACCESS_KEY_ID: 'test-key',
    AWS_SECRET_ACCESS_KEY: 'test-secret',
    COGNITO_USER_POOL_ID: 'test-pool-id',
    COGNITO_CLIENT_ID: 'test-client-id',
  },
}));

jest.mock('../config/cognito', () => ({
  cognito: {
    send: jest.fn(),
  },
}));

const mockRequest = {
  body: {
    email: 'testemail@gmail.com',
    username: 'testUser',
    password: 'password123',
    confirmationCode: "testcode"
  },
  params: { id: '1' },
  user: { id: '1' },
} as unknown as Request;

let mockResponse: Partial<Response>

beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
})

describe("register", () => {

   test("should register a new user", async () => {
        (cognito.send as jest.Mock).mockResolvedValue({
            UserSub: 'mock-cognito-sub-123',
            UserConfirmed: false,
        });

            await signUp(mockRequest, mockResponse as Response)
    
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true});
    })



    test("should confirm a new user and save it into database", async () => {
        (cognito.send as jest.Mock)
        .mockResolvedValueOnce({ UserConfirmed: true })
        .mockResolvedValueOnce({
            UserAttributes: [
            { Name: 'sub', Value: 'mock-cognito-sub-123' },
            { Name: 'email', Value: 'testemail@gmail.com' },
            ],
        });

        await confirmSignUp(mockRequest, mockResponse as Response)

        expect(prisma.user.create).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User confirmed successfully' });
        
    })
})

describe("login", () => {



    test('should fail if no AuthenticationResult', async () => {
        (cognito.send as jest.Mock).mockResolvedValue({
        AuthenticationResult: null,
        });

        await expect(login(mockRequest, mockResponse as Response)).rejects.toThrow(ServerError);
    })

})

describe('resend code', () => {

    test('should resend a verification code to the user', async () => {
        (cognito.send as jest.Mock).mockResolvedValue({});

        await resendCode(mockRequest, mockResponse as Response)

        expect(cognito.send).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Confirmation code resent successfully',
        })
    })
})

describe('getme', () => {
    test('should return user info', async () => {
        await getMe(mockRequest, mockResponse as Response)

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockRequest.user)
    })

    test('should return error 401 if req.user not found', async () => {
        const getMeMockRequest = {} as unknown as Request;
        
        await expect(getMe(getMeMockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 401, message: 'Unauthorized' }))
    })
})

describe('deleteAccount', () => {
  test('should delete user, their posts photos, avatar, Cognito identity, and DB row', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'testemail@gmail.com',
      avatarUrl: 'https://test-bucket.s3.amazonaws.com/avatars/123.png',
    });

    (prisma.post.findMany as jest.Mock).mockResolvedValue([
      { photoUrl: 'https://test-bucket.s3.amazonaws.com/posts/abc.png' },
      { photoUrl: 'https://test-bucket.s3.amazonaws.com/posts/def.png' },
    ]);

    (s3.send as jest.Mock).mockResolvedValue({});
    (cognito.send as jest.Mock).mockResolvedValue({});
    (prisma.user.delete as jest.Mock).mockResolvedValue({ id: '1' });

    await deleteAccount(mockRequest, mockResponse as Response);

    expect(s3.send).toHaveBeenCalledTimes(1);
    const s3Call = (s3.send as jest.Mock).mock.calls[0][0];
    expect(s3Call.input.Delete.Objects).toEqual(
      expect.arrayContaining([
        { Key: 'posts/abc.png' },
        { Key: 'posts/def.png' },
        { Key: 'avatars/123.png' },
      ])
    );

    expect(cognito.send).toHaveBeenCalledTimes(1);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Account deleted successfully' });
  })

    test('should throw 401 if no authenticated user', async () => {
        const req = { user: undefined } as unknown as Request;

        await expect(deleteAccount(req, mockResponse as Response)).rejects.toThrow(ServerError);
        expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  test('should throw 404 if user does not exist in database', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(deleteAccount(mockRequest, mockResponse as Response)).rejects.toThrow(ServerError);
    expect(prisma.post.findMany).not.toHaveBeenCalled();
  });

  test('should skip S3 deletion when user has no posts or avatar', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'testemail@gmail.com',
      avatarUrl: null,
    });
    (prisma.post.findMany as jest.Mock).mockResolvedValue([]);
    (cognito.send as jest.Mock).mockResolvedValue({});
    (prisma.user.delete as jest.Mock).mockResolvedValue({ id: '1' });

    await deleteAccount(mockRequest, mockResponse as Response);

    expect(s3.send).not.toHaveBeenCalled();
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });

test('should throw 500 and NOT delete DB row if Cognito deletion fails', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'testemail@gmail.com',
      avatarUrl: null,
    });
    (prisma.post.findMany as jest.Mock).mockResolvedValue([]);
    (cognito.send as jest.Mock).mockRejectedValue(new Error('Cognito failure'));

    await expect(deleteAccount(mockRequest, mockResponse as Response)).rejects.toThrow(ServerError);
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });
})