import { useEffect, useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useTypedSelector } from './app/store'
import { Sidebar } from './components/Sidebar'
import { AddProject } from './pages/add-project/add-project'
import { LoginPage } from './pages/login'
import { Projects } from './pages/projects'
import { APP_ROUTES } from './shared/constants/routes'
import { useAuth } from './shared/user/hooks/useAuth'

const App = () => {
  const authService = useAuth()
  const user = useTypedSelector((s) => s.user)

  const isUserAuthed = user?.email && user.inited

  useEffect(() => {
    authService.checkAuth()
  }, [authService])

  /* authed */
  return (
    <div className="flex h-screen bg-gray-50">
      {isUserAuthed && <Sidebar />}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="*" element={<LoginPage />} />
          {isUserAuthed && (
            <>
              <Route path={APP_ROUTES.main} element={<Navigate to={APP_ROUTES.projects} replace />} />
              <Route path={APP_ROUTES.projects} element={<Projects />} />
              <Route path={APP_ROUTES.addProject} element={<AddProject />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  )
}

export default App
