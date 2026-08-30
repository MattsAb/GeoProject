import type { ApiResponse, Post, Trip } from "@geoapp/types"
import { handleError } from "../utils/handleError"
import api from "../utils/axios"

export async function createTrip(title: string, imageFile: File, description: string): Promise<ApiResponse<Trip>> {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('description', description);
        formData.append('title', title);

        const response = await api.post('/v1/trips', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (err) {
        return handleError(err);
    }
}

export async function getTripInfo(id: string): Promise<ApiResponse<Trip>>{
    try{
        const response = await api.get<ApiResponse<Trip>>(`/v1/trips/${id}`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}

export async function editTrip(id: string, description: string, title: string, posts?: Post[], imageFile?: File): Promise<ApiResponse<Trip>> {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('posts', JSON.stringify(posts));
        if (imageFile) formData.append('image', imageFile)
        const response = await api.put<ApiResponse<Trip>>(`/v1/trips/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (err) {
        return handleError(err)
    }
}

export async function deleteTrip(id: string): Promise<ApiResponse<null>> {
    try {
        const response = await api.delete(`/v1/trips/${id}`)

        return response.data
    } catch (err) {
        return handleError(err);
    }
}

export async function getUserTrips(id: string): Promise<ApiResponse<Trip[]>>{
    try{
        const response = await api.get<ApiResponse<Trip[]>>(`/v1/trips/user/${id}`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}