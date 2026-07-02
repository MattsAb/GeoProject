import { prisma } from '../config/prisma'
import {getProfile, updateProfile} from '../controllers/userController'
import { Request, Response } from 'express'

jest.mock('../config/prisma', () => ({
    prisma: {
        user: {
            update: jest.fn(),
            findUnique: jest.fn()
        }
    }
}))

jest.mock('../config/s3', () => ({
    s3: {
        send: jest.fn().mockResolvedValue({})
    },
    createUpload: jest.fn(() => ({
        single: jest.fn(() => (req: any, res: any, next: any) => next())
    }))
}))

let profile = {
    id: 1, 
    posts: [{id:1},{id:2}], 
    _count: {followers: 1, followed: 1, posts:1}
}

let updatedProfile = {
    id: 1,
    username: 'testusername',
    bio: 'bio',
    avatarUrl: 'avatarUrl',
    createdAt: new Date()
}

const mockRequest = {
    body: {
        bio: "bio",
        avatarUrl: "avatarUrl"
    },
    params: {
        id: 1
    },
    user: {
        id: 1
    }
} as unknown as Request

let mockResponse: Partial<Response>

beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
})

describe('getProfile', () => {
    test('should return status 200 and a profile', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(profile);

        await getProfile(mockRequest, mockResponse as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: profile});
    })

    test('should return status 404 and an error message', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(getProfile(mockRequest, mockResponse as Response)).rejects
        .toThrow(expect.objectContaining({ statusCode: 404, message: 'User not found' }))

        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    })
})

describe('updateProfile', () => {
    test('should return status 200 and an updated profile', async () => {
        (prisma.user.update as jest.Mock).mockResolvedValue(updatedProfile);
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(updatedProfile);
        await updateProfile(mockRequest, mockResponse as Response)

        expect(prisma.user.update).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: updatedProfile });
    })

test('should update the logged in user not params user', async () => {
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedProfile);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(updatedProfile);
    await updateProfile(mockRequest, mockResponse as Response)

    expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
            where: { id: 1 } 
        })
    )
})
})