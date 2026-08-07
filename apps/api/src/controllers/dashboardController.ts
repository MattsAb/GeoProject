import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

const TRIP_TAKE_NUM = 8;
const POST_TAKE_NUM = 12;

export async function getFeedTrips(req: Request, res: Response) {
    const q = req.query
    if (!req.user){
        const data = await get_basic_feed_trips(Number(q.q))
        return res.status(200).json({success: true, data})
    }
    const userId = req.user!.id

    const following = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followedId: true }
    })

    if (!following.length)
    {
        const data =  await get_basic_feed_trips(Number(q.q))
        return res.status(200).json({success: true, data})
    }

    const followingIds = following.map(f => f.followedId)

    const data = await  get_user_feed_trips(userId, followingIds, Number(q.q))
    return res.status(200).json({ success: true, data})

}

export async function getFeedPosts(req: Request, res: Response) {
    const q = req.query
    if (!req.user){
        const data = await get_basic_feed_posts(Number(q.q))
        return res.status(200).json({success: true, data})
    }
    const userId = req.user!.id

    const following = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followedId: true }
    })

    if (!following.length)
    {
        const data =  await get_basic_feed_posts(Number(q.q))
        return res.status(200).json({success: true, data})
    }

    const followingIds = following.map(f => f.followedId)

    const data = await  get_user_feed_posts(userId, followingIds)
    return res.status(200).json({ success: true, data})

}

async function get_basic_feed_trips(skip: number) {
        console.log(skip);
        const trips = await prisma.trip.findMany({
            skip,
            take: TRIP_TAKE_NUM,
            include: {
                user: {
                    select: {username: true, avatarUrl: true, id: true}
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        return trips;
}

async function get_basic_feed_posts(skip: number) {
        const posts = await prisma.post.findMany({
            skip,
            take: POST_TAKE_NUM,
            include: {
                _count: {
                    select: {likes: true}
                },
                user: {
                    select: {username: true, avatarUrl: true, id: true}
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        return posts;
}

async function get_user_feed_trips(userid: string, followingIds: string[], skip: number) {
    
    const trips = await prisma.trip.findMany({
        where: {
            userId: { in: followingIds }
        },
        include: {
            user: {
                select: { id: true, username: true, avatarUrl: true }
            },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: TRIP_TAKE_NUM,
    })

    return trips
}

async function get_user_feed_posts(userid: string, followingIds: string[]) {
    const posts = await prisma.post.findMany({
        where: {
            userId: { in: followingIds }
        },
        include: {
            user: {
                select: { id: true, username: true, avatarUrl: true }
            },
            _count: {
                select: { likes: true, comments: true }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: POST_TAKE_NUM,
    })


    return posts;
}