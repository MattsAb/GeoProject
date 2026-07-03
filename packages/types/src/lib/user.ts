import { Post } from "./post"

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

export interface SignUpDTO {
    email: string,
    username: string,
    password: string,
}

export interface ConfirmSignUpDTO {
    email: string,
    confirmationCode: string,
}

export interface LoginDTO {
    email: string,
    password: string,
}