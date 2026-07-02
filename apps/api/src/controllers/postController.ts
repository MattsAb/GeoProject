import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { ServerError } from '../middleware/errorMiddleware';
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '../config/s3'

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

export async function editPost(req: Request, res: Response) {
    const postId = req.body.postId;
    const userId = req.user!.id;
    const file = req.file as Express.MulterS3.File | undefined

    if (userId !== postId) {throw new ServerError(401, "Not authorized");}

    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) throw new ServerError(404, 'Post not found')

    if (file && post.photoUrl) {
        const key = post.photoUrl.split('.amazonaws.com/')[1]
        await s3.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key
        }))
    }
    
    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
            ...(req.body.description !== undefined && { description: req.body.description }),
            ...(file && { photoUrl: file.location }),
        }
    })

    return res.status(200).json({ success: true, data: updatedPost })

}

export async function deletePost(req: Request, res: Response) {}

export async function getFeed(req: Request, res: Response) {}

