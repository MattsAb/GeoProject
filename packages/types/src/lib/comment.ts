import type { User } from './user'

export interface Comment {
    id: number
    body: string
    createdAt: string
    userId: number
    user: User
    postId: number
}

export interface CommentDTO {
    body: string,
}