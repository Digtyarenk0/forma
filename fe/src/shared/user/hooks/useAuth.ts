import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setInited, setUserEmail } from '@/app/store/userSlice'
import { APP_ROUTES } from '@/shared/constants/routes'
import { decodeJwt } from '@/shared/lib/jwt'
import { ELocaleStorageKeys, LoginRegisterRequest } from '@/shared/types/auth'
import { authApi } from '@/shared/user/api/auth'

interface LoginCredentials {
  email: string
  password: string
}

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(ELocaleStorageKeys.accessToken)
      if (token) {
        const decodedToken = decodeJwt(token)
        if (decodedToken?.email) {
          dispatch(setUserEmail(decodedToken.email))
          navigate(APP_ROUTES.main)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
    dispatch(setInited(true))
  }, [dispatch, navigate])

  const login = async (data: LoginCredentials) => {
    try {
      const response = await authApi.login({
        email: data.email,
        password: data.password
      })

      const decodedToken = decodeJwt(response.accessToken)
      if (decodedToken?.email) {
        dispatch(setUserEmail(decodedToken.email))
        localStorage.setItem(ELocaleStorageKeys.accessToken, response.accessToken)
        navigate(APP_ROUTES.main)
      }
    } catch (error) {
      console.error('Login error:', error)
      // setErrors({
      //   email: 'Invalid email or password'
      // })
    }
  }

  const register = async (data: LoginRegisterRequest) => {
    try {
      const response = await authApi.register({
        email: data.email,
        password: data.password
      })

      const decodedToken = decodeJwt(response.accessToken)
      if (decodedToken?.email) {
        dispatch(setUserEmail(decodedToken.email))
        localStorage.setItem(ELocaleStorageKeys.accessToken, response.accessToken)
        navigate(APP_ROUTES.main)
      }
    } catch (error) {
      console.error('Registration error:', error)
      // setErrors({
      //   email: 'Email already exists'
      // })
    }
  }

  // const logout = async (data: LoginRegisterRequest) => {
  //   try {
  //     const response = await $api.post<AuthResponse>('/auth/login', data)
  //     if (response) {
  //       setUser(null)
  //       navigate(APP_ROUTES.login)
  //       return true
  //     }
  //     return false
  //   } catch (error) {
  //     console.error('Logout failed:', error)
  //     return false
  //   }
  // }

  return {
    // user,
    // loading,
    login,
    register,
    checkAuth
    // logout,
  }
}
