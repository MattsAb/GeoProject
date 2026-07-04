import type { ApiResponse, AuthResponse, LoginDTO, SignUpDTO, User } from "@geoapp/types";
import { handleError } from "../utils/handleError";
import api from "../utils/axios";

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
        await api.post<AuthResponse>('/v1/auth/signup', {
            email,
            username,
            password
        })

        return {success: true}

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

export async function confirmEmail(code: string, email: string, password: string, username: string): Promise<ApiResponse<AuthResponse>> {
    try {
            await api.post<AuthResponse>('/v1/auth/confirm', {
            confirmationCode: code,
            email,
            username
        })

        return await login({email, password})

    } catch (err) {
        return handleError(err);
    }

}

export async function resendCode(email: string): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await api.post<{ message: string }>('/v1/auth/resend', { email });
    return { success: true, data: response.data };
  } catch (err) {
    return handleError(err);
  }
}