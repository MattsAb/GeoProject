import { Trip } from "./trip"
import { User } from "./user"

export interface SearchInput {
    q: string
}

export interface SearchType {
    users: User[]
    trips: Trip[]
}