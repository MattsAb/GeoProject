import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { ServerError } from '../middleware/errorMiddleware';

export async function createPost(req: Request, res: Response) {

    const body = req.body;
    const file = req.file as Express.MulterS3.File;
    const userId = req.user!.id;

    const post = await prisma.post.create({
        data: {
            photoUrl: file.location,
            countryCode: body.countryCode,
            description: body.description,
            userId
        }
    })

    return res.status(201).json({ success: true, post });

}

export async function getPost(req: Request, res: Response) {
    const postId = req.body.postId;

    if (!postId) {throw new ServerError(404, 'Post not found');}

    const post = await prisma.post.findUnique({
        where: {id: postId},
        include: {
            user: true,
            comments: {
                include: {
                    user: {
                        select: { id: true, username: true, avatarUrl: true }
                    }
                }
            },
            _count: {
                select: {likes: true, comments: true}
            }
        }
    })

    return res.status(200).json({success: true, post});
}

export async function editPost(req: Request, res: Response) {}

export async function deletePost(req: Request, res: Response) {}

export async function getFeed(req: Request, res: Response) {}

