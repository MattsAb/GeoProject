import { prisma } from '../config/prisma'
import {likePost, unlikePost} from '../controllers/likeController'
import { Request, Response } from 'express'

jest.mock('../config/prisma', () => ({
    prisma: {
        like: {
            delete: jest.fn(),
            create: jest.fn()
        },

    }
}))

const mockRequest = {
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

describe('likePost', () => {
    test('should return status 201', async () => {

        await likePost(mockRequest, mockResponse as Response)

        expect(prisma.like.create).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true});
    })

})

describe('unlikePost', () => {
    test('should return status 200', async () => {

        await unlikePost(mockRequest, mockResponse as Response)

        expect(prisma.like.delete).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true});
    })

})