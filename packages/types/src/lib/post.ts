import type { Comment } from './comment'
import type { Like } from './like'
import type { User } from './user'

export interface Post {
    id: string
    photoUrl: string
    description: string
    createdAt: string
    userId: string
    countryCode: string
    user: User
    likes: Like[]
    comments: Comment[]
    _count?: {
        likes: number
        comments: number
    }
}

export interface PostDTO {
  photoUrl: string;
  description: string;
  countryCode: string;
}