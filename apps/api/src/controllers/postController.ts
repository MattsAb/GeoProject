import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { ServerError } from '../middleware/errorMiddleware';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '../config/s3';
import { PostDTO } from '@geoapp/types';

export async function createPost(req: Request, res: Response) {

    const { description, countryCode }: PostDTO = req.body;
    const file = req.file as Express.MulterS3.File;
    const userId = req.user!.id;

    const post = await prisma.post.create({
        data: {
            photoUrl: file.location,
            countryCode: countryCode,
            description: description,
            userId
        }
    })

    return res.status(201).json({ success: true, data: post });

}

export async function getPost(req: Request, res: Response) {
    
    const postId = req.params.postId as string;
    const userId = req.user?.id;


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
            },
            likes: userId ? { where: { userId }, select: { id: true } } : false,
        }
    })

    if (!post) {throw new ServerError(404, 'Post not found');}

    return res.status(200).json({success: true, data: post});
}

export async function editPost(req: Request, res: Response) {
    const postId = req.params.postId as string;
    const userId = req.user!.id;
    const file = req.file as Express.MulterS3.File | undefined

    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) throw new ServerError(404, 'Post not found')

    if (userId !== post.userId) {throw new ServerError(401, "Not authorized");}

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
            ...(req.body.countryCode !== undefined && { countryCode: req.body.countryCode }),
            ...(file && { photoUrl: file.location }),
        }
    })

    return res.status(200).json({ success: true, data: updatedPost })

}

export async function deletePost(req: Request, res: Response) {

    const postId = req.params.id as string;
    const userId = req.user!.id;

    const post = await prisma.post.findUnique({ where: { id: postId } })

    if (!post) throw new ServerError(404, 'Post not found')
    if (post.userId !== userId) throw new ServerError(403, 'Forbidden')

    await prisma.post.delete({ where: { id: postId } })

    const key = post.photoUrl.split('.amazonaws.com/')[1]
    if (!key) throw new ServerError(500, 'Could not parse photo key');
    await s3.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key
    }))

    return res.status(200).json({ success: true })
}

export async function getFeed(req: Request, res: Response) {

    const userId = req.user!.id

    const following = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followedId: true }
    })
    
    if (!following.length)
    {
        const posts = await prisma.post.findMany({
            take: 20,
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
        return res.status(200).json({success: true, data: posts})
    }

    const followingIds = following.map(f => f.followedId)

    const posts = await prisma.post.findMany({
        where: {
            userId: { in: followingIds }
        },
        include: {
            user: {
                select: { id: true, username: true, avatarUrl: true }
            },
            comments: {
                include: {
                    user: {
                        select: { id: true, username: true, avatarUrl: true }
                    }
                }
            },
            _count: {
                select: { likes: true, comments: true }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
    })

    return res.status(200).json({ success: true, data: posts })

}

