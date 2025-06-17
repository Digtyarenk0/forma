import { useNavigate } from 'react-router-dom'

import { useTypedSelector } from '@/app/store'
import { APP_ROUTES } from '@/shared/constants/routes'

export const Sidebar = () => {
  const user = useTypedSelector((s) => s.user)
  const navigate = useNavigate()

  return (
    <div className="h-screen w-64 border-r border-gray-200 bg-gray-50 p-4">
      <div className="mb-8">
        <p className="mb-1 text-sm text-gray-600">User Email</p>
        <p className="text-base font-medium text-gray-900">{user?.email}</p>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => navigate(APP_ROUTES.projects)}
          className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
        >
          <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Projects
        </button>

        <button
          onClick={() => navigate(APP_ROUTES.addProject)}
          className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
        >
          <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </nav>
    </div>
  )
}
