import type { Post } from "./post"
import type { User } from "./user"


export interface Trip {
    id: string
    title: string
    photoUrl?: string
    description: string
    createdAt: string
    userId: string
    user?: User
    posts: Post[]
}

export interface TripDTO {
    title: string
    photoUrl?: string
    description?: String
    posts?: Post[]
}