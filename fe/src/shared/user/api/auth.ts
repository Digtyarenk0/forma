import { $api } from '../../api/api'
import { AuthResponse, LoginRegisterRequest } from '../../types/auth'

export const authApi = {
  login: async (data: LoginRegisterRequest): Promise<AuthResponse> => {
    const response = await $api.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  register: async (data: LoginRegisterRequest): Promise<AuthResponse> => {
    const response = await $api.post<AuthResponse>('/auth/register', data)
    return response.data
  }
}
