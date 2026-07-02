import { prisma } from '../config/prisma'
import {followUser, unfollowUser} from '../controllers/followController'
import { Request, Response } from 'express'

jest.mock('../config/prisma', () => ({
    prisma: {
        follow: {
            delete: jest.fn(),
            create: jest.fn()
        },

    }
}))

const mockRequest = {
    params: {
        id: 2
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

describe('followUser', () => {
    test('should follow a user', async () => {

        await followUser(mockRequest, mockResponse as Response)

        expect(prisma.follow.create).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true});
    })

})

describe('unfollowUser', () => {
    test('should unfollow a user', async () => {

        await unfollowUser(mockRequest, mockResponse as Response)

        expect(prisma.follow.delete).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true});
    })

})