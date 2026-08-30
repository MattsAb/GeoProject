import type { CommentType } from './comment'
import type { Like } from './like'
import type { Place } from './place'
import type { User } from './user'

export interface Post {
    id: string
    photoUrl: string
    description: string
    createdAt: string
    userId: string
    user: User
    place: Place
    likes: Like[]
    comments: CommentType[]
    _count?: {
        likes: number
        comments: number
    }
}

export interface PostDTO {
  photoUrl: string;
  description: string;
  placeInfo: Place;
}