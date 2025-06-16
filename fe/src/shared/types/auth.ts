export interface LoginRegisterRequest {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
}
