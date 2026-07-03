import type { ApiResponse, Post } from "@geoapp/types"
import { handleError } from "./handleError"
import api from "./utils/axios"


export async function createPost(description: string, imageFile: File, countryCode: string): Promise<ApiResponse<Post>> {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('description', description);
        formData.append('countryCode', countryCode);

        const response = await api.post('/v1/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (err) {
        return handleError(err);
    }
}

export async function getPost(id: string): Promise<ApiResponse<Post>>{
    try{
        const response = await api.get<ApiResponse<Post>>(`/v1/posts/${id}`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}