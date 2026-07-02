import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { ServerError } from '../middleware/errorMiddleware';
import { s3 } from '../config/s3';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

export async function getProfile(req: Request, res: Response) {
    const profileId = req.params.id as string;
    const userId = req.user?.id;

    const profile = await prisma.user.findUnique({
        where: { id: profileId },
        select: {
            id: true,
            username: true,
            bio: true,
            avatarUrl: true,
            createdAt: true,
            posts: {
                include: {
                    user: true,
                    _count: {
                        select: {likes: true}
                    }
                },
                orderBy: { createdAt: 'desc' },
            },
            _count: {
                select: {
                    followers: true,
                    posts: true
                }
            },
            followers: {
            where: { followerId: userId },
            select: { followerId: true }
        },
        }
    })

    if (!profile) throw new ServerError(404, 'User not found');

    return res.status(200).json({success: true, data: profile})

}

export async function updateProfile(req: Request, res: Response) {
    const userId = req.user!.id
    const body = req.body;
    const file = req.file as Express.MulterS3.File | undefined

    const user = await prisma.user.findUnique({
        where: {id: userId}
    })

    if (!user) throw new ServerError(403, 'Forbidden')
    
    if (file && user.avatarUrl) {
            const key = user.avatarUrl.split('.amazonaws.com/')[1]
            await s3.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: key
            }))
        }

    const profile = await prisma.user.update({
        where: { id: userId },
        data: {
            ...(body.bio !== undefined && { bio: body.bio }),
            ...(file && { avatarUrl: file.location }),
        },
        select: {
            id: true,
            username: true,
            bio: true,
            avatarUrl: true,
            createdAt: true
        }
    })

    return res.status(200).json({ success: true, data: profile })
}

export async function getSearchUsers(req: Request, res: Response) {
    const query = req.query.q as string

    if (!query) return res.status(400).json({ success: false, message: 'Query is required' })

    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: query,
                mode: 'insensitive'
            }
        },
        select: {
            id: true,
            username: true,
            avatarUrl: true,
            bio: true,
            _count: {
                select: {
                    posts: true,
                    followers: true,
                }
            }
        },
    })

    return res.status(200).json({ success: true, data: users })
}