import type { ApiResponse, ProfileType, User } from "@geoapp/types";
import { handleError } from "./handleError";
import api from "./utils/axios";


export async function getUserProfile (id: string): Promise<ApiResponse<ProfileType>> {
    try {
        const response = await api.get<ApiResponse<ProfileType>>(`/v1/user/${id}`)
        return response.data
    } catch (err) {
        return handleError(err);
    }

}
export async function editUserProfile(bio: string, imageFile?: File): Promise<ApiResponse<User>> {
    try {
        const formData = new FormData()
        formData.append('bio', bio)
        if (imageFile) {
            formData.append('image', imageFile)
        }

        const response = await api.put<ApiResponse<User>>(`/v1/user`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (err) {
        return handleError(err)
    }
}