import type { User } from "./user"

export interface Follow {
    id: number
    followerId: number
    follower: User
    followedId: number
    followed: User
}