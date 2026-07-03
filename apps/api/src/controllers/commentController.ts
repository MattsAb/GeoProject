import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { ServerError } from '../middleware/errorMiddleware';
import { CommentDTO } from '@geoapp/types';

export async function createComment (req: Request, res: Response) {

    const { body: commentBody }: CommentDTO = req.body;

    if (!commentBody) return res.status(400).json({ success: false, message: 'Comment body is required' })

    const postId = req.params.postId as string;
    const userId = req.user!.id;

    const comment = await prisma.comment.create({
        data: {
            userId: userId,
            postId: postId,
            body: commentBody
        },
        include: {
        user: {
            select: { id: true, username: true, avatarUrl: true }
        }
    }
    })

    return res.status(201).json({success: true, data: comment}) 

}

export async function deleteComment(req: Request, res: Response) {
    const commentId = req.params.commentId as string;
    const userId = req.user!.id

    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        include: { post: true }
    })

    if (!comment) throw new ServerError(404, 'Comment not found')


    const isCommentOwner = comment.userId === userId;
    const isPostOwner = comment.post.userId === userId;

    if (!isCommentOwner && !isPostOwner) throw new ServerError(403, 'Forbidden')

    await prisma.comment.delete({
        where: { id: commentId }
    })

    return res.status(200).json({ success: true })
}