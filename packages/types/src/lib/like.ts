import type { Post } from "./post";
import type { User } from "./user";

export interface Like {
    id: string
    userID: string
    user: User
    postID: number
    post: Post
}