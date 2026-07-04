import type { ApiResponse } from "@geoapp/types"
import axios from "axios"

export function handleError(err: unknown): ApiResponse<never> {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;

    if (data?.errors?.length) {
      return {
        success: false,
        error: data.errors[0].message,
      };
    }

    return {
      success: false,
      error: data?.message ?? 'Something went wrong',
    };
  }
  return { success: false, error: 'Unexpected error' };
}