import type { Trip } from "./trip"
import type { User } from "./user"

export interface SearchInput {
    q: string
}

export interface SearchType {
    users: User[]
    trips: Trip[]
}