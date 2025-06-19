import axios from 'axios'
import { toast } from 'react-toastify'

import { ELocaleStorageKeys } from '../types/auth'

const isRefreshing = { value: false }
let failedQueue: any[] = []

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}
const API_URL = import.meta.env.VITE_API_URL

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

$api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(ELocaleStorageKeys.accessToken)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing.value) {
        // wait update token
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return $api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing.value = true

      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true })

        localStorage.setItem(ELocaleStorageKeys.accessToken, data.accessToken)
        $api.defaults.headers.Authorization = `Bearer ${data.accessToken}`
        processQueue(null, data.accessToken)

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return $api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        toast.warn('Session end')
        localStorage.removeItem(ELocaleStorageKeys.accessToken)
        window.location.href = '/'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing.value = false
      }
    }

    return Promise.reject(error)
  }
)
