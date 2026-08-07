import type { ApiResponse, Place } from "@geoapp/types";
import api from "../utils/axios";
import { handleError } from "../utils/handleError";

export async function getPlace(id: string): Promise<ApiResponse<Place>>{
    try{
        const response = await api.get<ApiResponse<Place>>(`/v1/place/${id}`)
        return response.data

    } catch (err) {
        return handleError(err);
    }
}