import type { ApiResponse } from "@geoapp/types";
import api from "../utils/axios";
import { handleError } from "../utils/handleError";


export async function likePost(id: string): Promise<ApiResponse<null>> {
    try{
        const response = await api.post<ApiResponse<null>>(`/v1/post/${id}/like`)

        return response.data

    } catch (err) {
        return handleError(err);
    }
}

export async function unlikePost(id: string): Promise<ApiResponse<null>> {
    try{
        const response = await api.delete<ApiResponse<null>>(`/v1/post/${id}/like`)

        return response.data

    } catch (err) {
        return handleError(err);
    }
}