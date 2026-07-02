import type { Post } from "./post";
import type { User } from "./user";

export interface Like {
    id: number
    userID: number
    user: User
    postID: number
    post: Post
}