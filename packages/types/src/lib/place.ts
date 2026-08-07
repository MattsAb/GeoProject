import { Post } from "./post"

export interface Place {
    id?: string
    place_id: string
    placeName?: string
    posts?: Post[]
}