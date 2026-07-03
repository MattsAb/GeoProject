import type { ApiResponse } from "@geoapp/types"
import axios from "axios"

export function handleError(err: unknown): ApiResponse<never> {
    if (axios.isAxiosError(err)) {
        return {
            success: false,
            error: err.response?.data?.message ?? 'Something went wrong'
        }
    }
    return { success: false, error: 'Something went wrong'}
}