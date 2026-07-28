import type { ApiResponse, Feed } from "@geoapp/types";
import api from "../utils/axios";
import { handleError } from "../utils/handleError";

export async function getFeed(): Promise<ApiResponse<Feed>>{
    try{
        const response = await api.get<ApiResponse<Feed>>(`/v1`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}