import type { User } from './user'

export interface CommentType {
    id: string
    body: string
    createdAt: string
    userId: string
    user: User
    postId: string
}

export interface CommentDTO {
    body: string,
}