import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { prisma } from '../config/prisma';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

jest.mock('../config/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('aws-jwt-verify', () => ({
  CognitoJwtVerifier: {
    create: jest.fn(),
  },
}));

jest.mock('../schemas/env', () => ({
  env: {
    COGNITO_USER_POOL_ID: 'test-pool-id',
    COGNITO_CLIENT_ID: 'test-client-id',
  },
}));

const mockVerify = jest.fn();

beforeAll(() => {
  (CognitoJwtVerifier.create as jest.Mock).mockReturnValue({
    verify: mockVerify,
  });
});

let mockResponse: Partial<Response>;
let mockNext: NextFunction;

beforeEach(() => {
  jest.clearAllMocks();
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  mockNext = jest.fn();
});

describe('authMiddleware', () => {
  test('should return 401 when no token is provided', async () => {
    const req = { headers: {} } as Request;

    await authMiddleware(req, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No token provided' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should return 401 when token verification fails', async () => {
    const req = { headers: { authorization: 'Bearer invalidtoken' } } as Request;
    mockVerify.mockRejectedValue(new Error('Token expired'));

    await authMiddleware(req, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
    expect(mockNext).not.toHaveBeenCalled();
  });

})