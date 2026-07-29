import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { ServerError } from '../middleware/errorMiddleware';

export async function getFeed(req: Request, res: Response) {
    const userId = req.user!.id

    const following = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followedId: true }
    })
    
    if (!following.length)
    {
        const data =  await get_basic_feed()
        return res.status(200).json({success: true, data})
    }

    const followingIds = following.map(f => f.followedId)

    const data = await  get_user_feed(userId, followingIds)
    return res.status(200).json({ success: true, data})

}

async function get_basic_feed() {

        const posts = await prisma.post.findMany({
            take: 15,
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
        const trips = await prisma.trip.findMany({
            take: 10,
            include: {
                user: {
                    select: {username: true, avatarUrl: true, id: true}
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        return {posts, trips};
}

async function get_user_feed(userid: string, followingIds: string[]) {
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
        take: 15,
    })

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
        take: 10,
    })

    return {posts, trips} 
}