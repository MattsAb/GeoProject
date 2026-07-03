import type { ApiResponse, AuthResponse, LoginDTO, SignUpDTO, User } from "@geoapp/types";
import { handleError } from "./handleError";
import api from "./utils/axios";

export async function login({email, password}: LoginDTO): Promise<ApiResponse<AuthResponse>> {
    try{
        const response = await api.post<AuthResponse>('/v1/auth/login', {
            email,
            password
        })

        if (response.data) {
            localStorage.setItem('idToken', response.data.idToken);
            getMe();
        }
       return { success: true, data: response.data }
    }
    catch (err) {
        return handleError(err);
    }
}

export async function register({email, username, password}: SignUpDTO): Promise<ApiResponse<AuthResponse>> {

    try {
        const response = await api.post<AuthResponse>('/v1/auth/signup', {
            email,
            username,
            password
        })

        if (response.data) {
            localStorage.setItem('idToken', response.data.idToken);
            getMe();
        }
        return {success: true, data: response.data}

    } catch (err) {
        return handleError(err);
    }
}

export async function getMe(): Promise<ApiResponse<User>> {
  try {
    const response = await api.get<User>('/v1/auth/me');
    return { success: true, data: response.data };
  } catch (err) {
    return handleError(err);
  }
}