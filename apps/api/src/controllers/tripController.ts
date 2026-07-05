import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { TripDTO } from '@geoapp/types';
import { ServerError } from '../middleware/errorMiddleware';

export async function createTrip(req: Request, res: Response) {
    const {photoUrl, title, description}: TripDTO = req.body;
    const userId = req.user?.id as string;

    const trip = await prisma.trip.create({
        data: {
            title,
            description: description as string,
            photoUrl,
            userId,
        }
    })

    return res.status(201).json({success: true, data: trip});
}

export async function getTrip(req: Request, res: Response) {
    const tripId = req.params.tripId as string;

    const trip = await prisma.trip.findUnique({
        where: {id: tripId},
        include: {
            posts: true
        },
    })

    if (!trip) { throw new ServerError(404, "Not found")}

    res.status(200).json({success: true, data: trip})

}

export async function editTrip(req: Request, res: Response) {
    const {photoUrl, title, description}: TripDTO = req.body;
    const tripId = req.params.tripID as string
    const userId = req.user?.id;

    const trip = await prisma.trip.findUnique({
        where: {id: tripId}
    })

    if(trip?.userId !== userId) { throw new ServerError(403, "Forbbiden")}

    const updatedTrip = await prisma.trip.update({
        where: { id: tripId },
        data: {
            title,
            photoUrl,
            description: description as string
        }
    })

    res.status(201).json({success: true, data: updatedTrip});
}

export async function deleteTrip(req: Request, res: Response) {
    const tripId = req.params.tripID as string
    const userId = req.user?.id;

    const trip = await prisma.trip.findUnique({
        where: {id: tripId}
    })

    if(trip?.userId !== userId) { throw new ServerError(403, "Forbbiden")}

    await prisma.trip.delete({
        where: { id: tripId },
    })

    res.status(201).json({success: true});
}

