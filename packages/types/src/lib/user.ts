
export interface User {
    id: number
    email: string
    username: string
    countryCode: string
    bio?: string | null
    avatarUrl?: string | null
    provider: string
    createdAt: string
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