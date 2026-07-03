import { User } from "./user"

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
}

export interface AuthResponse {
    success: boolean
    idToken: string
    user: User
}