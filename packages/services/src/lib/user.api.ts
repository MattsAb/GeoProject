import type { ApiResponse, Post, Trip } from "@geoapp/types";
import api from "../utils/axios";
import { handleError } from "../utils/handleError";

export async function getFeedPosts(query: number): Promise<ApiResponse<Post[]>>{
    try{
        const response = await api.get<ApiResponse<Post[]>>(`/v1/feedposts`, { params: { q: `${query}` }})
        return response.data

    } catch (err) {
        return handleError(err);
    }
}

export async function getFeedTrips(query: number): Promise<ApiResponse<Trip[]>>{
    try{
        const response = await api.get<ApiResponse<Trip[]>>(`/v1/feedtrips`, { params: { q: `${query}` }})
        return response.data

    } catch (err) {
        return handleError(err);
    }
}