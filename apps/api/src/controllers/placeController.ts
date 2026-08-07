import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { ServerError } from '../middleware/errorMiddleware';
import { getPlaceName } from '../config/google_place';

export async function getPlace(req: Request, res: Response) {
    
    const placeId = req.params.placeId as string;

    const place = await prisma.place.findUnique({
        where: {id: placeId},
        include: {posts: true}
    })

    if (!place) {throw new ServerError(404, 'Place not found');}

    let placeName: string | null = null;
    if (place.place_id) {
        placeName = await getPlaceName(place.place_id);
        place.placeName  = placeName
    }

    return res.status(200).json({success: true, data: place});
}