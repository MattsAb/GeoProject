import type { Comment } from './comment'
import type { Like } from './like'
import type { User } from './user'

export interface Post {
    id: number
    photoUrl: string
    description: string
    createdAt: string
    userId: number
    countryCode: string
    user: User
    likes: Like[]
    comments: Comment[]
    _count?: {
        likes: number
        comments: number
    }
}