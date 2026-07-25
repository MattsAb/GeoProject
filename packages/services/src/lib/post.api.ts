import type { ApiResponse, Post } from "@geoapp/types"
import { handleError } from "../utils/handleError"
import api from "../utils/axios"


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

export async function editPost(id: string, countryCode: string, description: string, imageFile?: File): Promise<ApiResponse<Post>> {
    try {
        const formData = new FormData();
        formData.append('countryCode', countryCode);
        formData.append('description', description);
        if (imageFile) formData.append('image', imageFile)
        const response = await api.put<ApiResponse<Post>>(`/v1/posts/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (err) {
        return handleError(err)
    }
}

export async function deletePost(id: string): Promise<ApiResponse<null>> {
    try {
        const response = await api.delete(`/v1/posts/${id}`)

        return response.data
    } catch (err) {
        return handleError(err);
    }
}

export async function getFeed(): Promise<ApiResponse<Post[]>>{
    try{
        const response = await api.get<ApiResponse<Post[]>>(`/v1/posts`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}

export async function getLikedPosts(id: string): Promise<ApiResponse<Post[]>>{
    try{
        const response = await api.get<ApiResponse<Post[]>>(`/v1/post/${id}/like`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}

export async function getUserPosts(): Promise<ApiResponse<Post[]>>{
    try{
        const response = await api.get<ApiResponse<Post[]>>(`/v1/posts/user`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}