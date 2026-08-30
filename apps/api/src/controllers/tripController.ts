import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { TripDTO } from '@geoapp/types';
import { ServerError } from '../middleware/errorMiddleware';
import { s3 } from '../config/s3';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

export async function createTrip(req: Request, res: Response) {
    const {title, description}: TripDTO = req.body;
    const file = req.file as Express.MulterS3.File;
    const userId = req.user?.id as string;

    const trip = await prisma.trip.create({
        data: {
            title,
            description: description as string,
            photoUrl: file.location,
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
            posts: {
                include: {
                    _count: {
                        select: {likes: true}
                    }
                }
            },
            user: true,
        },
    })

    if (!trip) { throw new ServerError(404, "Not found")}
    res.status(200).json({success: true, data: trip})

}

export async function editTrip(req: Request, res: Response) {
    const tripId = req.params.tripId as string
    const userId = req.user?.id;
    const file = req.file as Express.MulterS3.File;

    let posts: { id: string }[] | undefined;
    if (req.body.posts) {
        posts = typeof req.body.posts === 'string' ? JSON.parse(req.body.posts) : req.body.posts;
    }

    const trip = await prisma.trip.findUnique({
        where: {id: tripId}
    })
    
    if (!trip) throw new ServerError(404, 'Trip not found');
    if(trip?.userId !== userId) { throw new ServerError(403, "Forbbiden")}

    if (file && trip.photoUrl) {
            const key = trip.photoUrl.split('.amazonaws.com/')[1]
            await s3.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: key
            }))
    }

    const updatedTrip = await prisma.trip.update({
        where: { id: tripId },
        data: {
            ...(req.body.description !== undefined && { description: req.body.description }),
            ...(req.body.title !== undefined && { title: req.body.title }),
            ...(file && { photoUrl: file.location }),
        }
    })

    if (posts?.length) {
        const postIds = posts.map((p) => p.id);

        const ownedCount = await prisma.post.count({
            where: { id: { in: postIds }, userId },
        });

        if (ownedCount !== postIds.length) {
            throw new ServerError(403, 'You can only add your own posts to a trip');
        }

        await prisma.$transaction([
            prisma.post.updateMany({
            where: {
                tripId: updatedTrip.id,
                id: { notIn: postIds },
            },
            data: { tripId: null },
            }),
            prisma.post.updateMany({
            where: {
                id: { in: postIds },
            },
            data: { tripId: updatedTrip.id },
            }),
        ]);
    }

    res.status(201).json({success: true, data: updatedTrip});
}

export async function deleteTrip(req: Request, res: Response) {
    const tripId = req.params.tripId as string
    const userId = req.user?.id;

    const trip = await prisma.trip.findUnique({
        where: {id: tripId}
    })
    if(!trip) {throw new ServerError(404, "Trip not found")}
    if(trip?.userId !== userId) { throw new ServerError(403, "Forbidden")}

    await prisma.trip.delete({
        where: { id: tripId },
    })

    res.status(200).json({success: true});
}

export async function getUserTrips(req: Request, res: Response) {
    const userId = req.params.id as string;

    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            trips: true
        }
    })
    const trips = user?.trips

    return res.status(200).json({success: true, data: trips})
}