import type { ApiResponse } from "@geoapp/types";
import api from "./utils/axios";
import { handleError } from "./handleError";


export async function postComment(id: string, comment: string): Promise<ApiResponse<Comment>> {
    try{
        const response = await api.post<ApiResponse<Comment>>(`/v1/post/${id}/comments`, {
            body: comment
        })
        return response.data

    } catch (err) {
        return handleError(err);
    }
}

export async function deleteComment(postId: string, commentId: string): Promise<ApiResponse<null>> {
    try{
        const response = await api.delete<ApiResponse<null>>(`/v1/post/${postId}/comments/${commentId}`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}