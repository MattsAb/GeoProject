
import { prisma } from '../config/prisma';
import { Request, Response } from 'express';
import { createTrip, deleteTrip, editTrip, getTrip } from '../controllers/tripController';

jest.mock('../config/prisma', () => ({
    prisma: {
        trip: {
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
        title: 'title',
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

let trip = {
    id: 2,
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

describe('createTrip', () => {
    test('should return status 201 and a trip', async () => {
        (prisma.trip.create as jest.Mock).mockResolvedValue(trip);

        await createTrip(mockRequest, mockResponse as Response)

        expect(prisma.trip.create).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: trip });
    })

})

describe('deleteTrip', () => {

    test('should delete a trip', async () => {
        (prisma.trip.findUnique as jest.Mock).mockResolvedValue(trip);
        
        await deleteTrip(mockRequest, mockResponse as Response);

        expect(prisma.trip.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.trip.delete).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({success: true});
    })

    test('should return an error if trip does not exist', async () => {
        (prisma.trip.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(deleteTrip(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 404, message: "Trip not found" }))

        expect(prisma.trip.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.trip.delete).not.toHaveBeenCalled();

    })

    test('should return an error if userId != trip.userId', async () => {
        trip.userId = 3;
        (prisma.trip.findUnique as jest.Mock).mockResolvedValue(trip);

        await expect(deleteTrip(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 403, message: "Forbidden" }))

        expect(prisma.trip.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.trip.delete).not.toHaveBeenCalled();
    })

})

describe('getTrip', () => {

    test('should return a trip', async () => {
        (prisma.trip.findUnique as jest.Mock).mockResolvedValue(trip);

        await getTrip(mockRequest, mockResponse as Response);

        expect(prisma.trip.findUnique).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({success: true, data: trip});
    })

    test('should return error if failed to find trip', async () => {
        (prisma.trip.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(getTrip(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 404, message: "Not found" }))

         expect(prisma.trip.findUnique).toHaveBeenCalledTimes(1);
    })
})


describe('editTrip', () => {

    test('should edit a trip', async () => {
        trip.userId = 1;
        (prisma.trip.findUnique as jest.Mock).mockResolvedValue(trip);
        (prisma.trip.update as jest.Mock).mockResolvedValue(trip);

        await editTrip(mockRequest, mockResponse as Response);

        expect(prisma.trip.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.trip.update).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({success: true, data: trip});
    })

    test('should return an error if trip not found', async () => {
        (prisma.trip.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(editTrip(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 404, message: "Trip not found" }))

        expect(prisma.trip.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.trip.update).not.toHaveBeenCalled();
    })

    test('should return an error if user is not authorized', async () => {
        trip.userId = 5;
        (prisma.trip.findUnique as jest.Mock).mockResolvedValue(trip);

        await expect(editTrip(mockRequest, mockResponse as Response)).rejects
            .toThrow(expect.objectContaining({ statusCode: 403, message: "Forbbiden" }))

        expect(prisma.trip.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.trip.update).not.toHaveBeenCalled();
    })

})
