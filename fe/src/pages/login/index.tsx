import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { setUserEmail } from '@/app/store/userSlice'
import { authApi } from '@/shared/api/auth'
import { APP_ROUTES } from '@/shared/constants/routes'
import { decodeJwt } from '@/shared/lib/jwt'
import { ELocaleStorageKeys } from '@/shared/types/auth'
import { validateEmail, validatePassword } from '@/shared/utils/validation'

interface LoginFormState {
  email: string
  password: string
}

interface LoginFormErrors {
  email?: string
  password?: string
}

export const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<LoginFormErrors>({})

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    const emailError = validateEmail(formState.email)
    const passwordError = validatePassword(formState.password)

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      })
      return
    }

    try {
      const response = await authApi.login({
        email: formState.email,
        password: formState.password
      })

      const decodedToken = decodeJwt(response.accessToken)
      if (decodedToken?.email) {
        dispatch(setUserEmail(decodedToken.email))
        localStorage.setItem(ELocaleStorageKeys.accessToken, response.accessToken)
        navigate(APP_ROUTES.main)
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({
        email: 'Invalid email or password'
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }))
    setErrors((prev) => ({
      ...prev,
      [name]: undefined
    }))
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formState.email}
                  onChange={handleInputChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formState.password}
                  onChange={handleInputChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to={APP_ROUTES.register}
                className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
