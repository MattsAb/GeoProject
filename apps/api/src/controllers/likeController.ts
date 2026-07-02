import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { ServerError } from '../middleware/errorMiddleware'

export async function likePost (req: Request, res: Response) {
    const postId = req.params.id as string;
    const userId = req.user!.id;

    await prisma.like.create({
        data: {
            userId: userId,
            postId: postId
        }
    })

    return res.status(201).json({success: true}) 

}

export async function unlikePost(req: Request, res: Response) {
    const postId = req.params.id as string;
    const userId = req.user!.id;

    await prisma.like.delete({
        where: {
            userId_postId: {
                userId: userId,
                postId: postId
            }
        }
    })
    return res.status(200).json({ success: true })

}

export async function getLikedPosts(req: Request, res: Response) {
    const userId = req.user!.id;


    const likes = await prisma.like.findMany({
        where: { userId },
        include: {
            post: {
                include: {
                    user: true,
                    _count: {
                        select: {likes: true}
                    }
                }
            }
        }
    })
    const posts = likes.map(like => like.post)

    if (!posts) throw new ServerError(404, 'Post not found');

    return res.status(200).json({success: true, data: posts})

}