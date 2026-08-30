import type { ApiResponse } from "../../../types/src/lib/api";
import type { SearchType } from "../../../types/src/lib/search";
import api from "../utils/axios";
import { handleError } from "../utils/handleError";



export async function getSearch(query: string): Promise<ApiResponse<SearchType>>{
    try{
        const response = await api.get<ApiResponse<SearchType>>(`/v1/search`, { params: { q: query }})
        return response.data

    } catch (err) {
        return handleError(err);
    }
}