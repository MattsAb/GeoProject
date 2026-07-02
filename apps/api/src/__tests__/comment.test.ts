import { prisma } from '../config/prisma'
import { createComment, deleteComment } from '../controllers/commentController';
import { Request, Response } from 'express'

jest.mock('../config/prisma', () => ({
    prisma: {
        comment: {
            findUnique: jest.fn(),
            delete: jest.fn(),
            create: jest.fn()
        },

    }
}))

const mockRequest = {
    body: {
        commentBody: "testbody"
    },
    params: {
        id: 1
    },
    user: {
        id: 1
    }
} as unknown as Request

const comment = {
    id: 1,
    userId: 1,        // matches mockRequest.user.id
    body: 'test',
    postId: 1,
    post: {
        id: 1,
        userId: 1     // for isPostOwner check
    }
}

let mockResponse: Partial<Response>

beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
})

describe('createComment', () => {
    test('should create a comment', async () => {
        (prisma.comment.create as jest.Mock).mockResolvedValue(comment);

        await createComment(mockRequest, mockResponse as Response)

        expect(prisma.comment.create).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: comment});
    })

})

describe('deleteComment', () => {
    test('should delete a comment', async () => {
        (prisma.comment.findUnique as jest.Mock).mockResolvedValue(comment);


        await deleteComment(mockRequest, mockResponse as Response)

        expect(prisma.comment.delete).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true })
    })
    test('should return an error if comment not found', async () => {
        (prisma.comment.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(deleteComment(mockRequest, mockResponse as Response)).rejects
        .toThrow(expect.objectContaining({ statusCode: 404, message: 'Comment not found' }))

        expect(prisma.comment.delete).not.toHaveBeenCalled();
    })

})