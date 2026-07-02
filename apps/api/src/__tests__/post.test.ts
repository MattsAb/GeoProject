
import { prisma } from '../config/prisma';
import { Request, Response } from 'express';
import { createPost, deletePost, editPost, getPost } from '../controllers/postController';

jest.mock('../config/prisma', () => ({
    prisma: {
        post: {
            create: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
        },
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

const mockRequest = {
    body: {
        description: "description",
        photoUrl: "photoUrl"
    },
    params: {
        id: 1
    },
    user: {
        id: 1
    },
    file: {location: 'somelocation'}
} as unknown as Request

let mockResponse: Partial<Response>

let post = {
    id: 2,
    countryCode: "LT",
    photoUrl: "photoUrl.amazonaws.com/1",
    description: "descrition",
    userId: 1,
    createdAt: "data",
}

beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
})

describe('createPost', () => {
    test('should return status 201 and a post', async () => {
        (prisma.post.create as jest.Mock).mockResolvedValue(post);

        await createPost(mockRequest, mockResponse as Response)

        expect(prisma.post.create).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: post });
    })

})

describe('deletePost', () => {

    test('should delete a post', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(post);
        
        await deletePost(mockRequest, mockResponse as Response);

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.post.delete).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({success: true});
    })

    test('should return an error if post does not exist', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(deletePost(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 404, message: "Post not found" }))

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.post.delete).not.toHaveBeenCalled();

    })

    test('should return an error if userId != post.userId', async () => {
        post.userId = 3;
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(post);

        await expect(deletePost(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 403, message: "Forbidden" }))

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.post.delete).not.toHaveBeenCalled();
    })

})

describe('getPost', () => {

    test('should return a post', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(post);

        await getPost(mockRequest, mockResponse as Response);

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({success: true, data: post});
    })

    test('should return error if failed to find post', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(getPost(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 404, message: "Post not found" }))

         expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
    })
})


describe('editPost', () => {

    test('should edit a post', async () => {
        post.userId = 1;
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(post);
        (prisma.post.update as jest.Mock).mockResolvedValue(post);

        await editPost(mockRequest, mockResponse as Response);

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.post.update).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({success: true, data: post});
    })

    test('should return an error if post not found', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(editPost(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 404, message: "Post not found" }))

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.post.update).not.toHaveBeenCalled();
    })

    test('should return an error if user is not authorized', async () => {
        post.userId = 5;
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(post);

        await expect(editPost(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 401, message: "Not authorized" }))

        expect(prisma.post.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.post.update).not.toHaveBeenCalled();
    })

})
