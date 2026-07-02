
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