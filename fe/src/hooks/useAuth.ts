import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setUserEmail } from '@/app/store/userSlice'
import { $api } from '@/shared/api/api'
import { APP_ROUTES } from '@/shared/constants/routes'
import { decodeJwt } from '@/shared/lib/jwt'
import { AuthResponse, ELocaleStorageKeys, LoginRegisterRequest } from '@/shared/types/auth'

interface User {
  email: string
  id: string
}

interface LoginCredentials {
  email: string
  password: string
}

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(ELocaleStorageKeys.accessToken)
      if (token) {
        const decodedToken = decodeJwt(token)
        if (decodedToken?.email) {
          dispatch(setUserEmail(decodedToken.email))
          navigate(APP_ROUTES.main)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (data: LoginCredentials) => {
    try {
      const response = await $api.post<AuthResponse>('/auth/login', data)

      const decodedToken = decodeJwt(response.data.accessToken)
      if (decodedToken?.email) {
        dispatch(setUserEmail(decodedToken.email))
        localStorage.setItem(ELocaleStorageKeys.accessToken, response.data.accessToken)
        navigate(APP_ROUTES.main)
      }
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const register = async (data: LoginRegisterRequest) => {
    try {
      const response = await $api.post<AuthResponse>('/auth/register', data)
      if (!response.data) {
        throw new Error('Registration failed')
      }

      const decodedToken = decodeJwt(response.data.accessToken)
      if (decodedToken?.email) {
        dispatch(setUserEmail(decodedToken.email))
        localStorage.setItem(ELocaleStorageKeys.accessToken, response.data.accessToken)
        navigate(APP_ROUTES.main)
      }
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  const logout = async (data: LoginRegisterRequest) => {
    try {
      const response = await $api.post<AuthResponse>('/auth/login', data)

      if (response) {
        setUser(null)
        navigate(APP_ROUTES.login)
        return true
      }
      return false
    } catch (error) {
      console.error('Logout failed:', error)
      return false
    }
  }

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth
  }
}
