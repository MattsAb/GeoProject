import type { Post } from "./post"

export interface ProfileType {
    username: string
    id: string
    bio?: string
    avatarUrl: string
    createdAt: string
    followers: number[]
    posts: Post[]
    _count: {
        posts: number
        followers: number
    }

}