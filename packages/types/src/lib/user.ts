import type { Post } from "./post"
import type { Trip } from "./trip"

export interface User {
    id: string
    email: string
    username: string
    countryCode: string
    bio?: string | null
    avatarUrl: string
    provider: string
    createdAt: string
    posts?: Post[]
    _count?: {
        followers: number
        posts: number
    }
}

export interface Feed {
    posts: Post[]
    trips: Trip[]
}

export interface SignUpDTO {
    email: string,
    username: string,
    password: string,
}

export interface ConfirmSignUpDTO {
    email: string,
    username: string,
    confirmationCode: string,
}

export interface LoginDTO {
    email: string,
    password: string,
}