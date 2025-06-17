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

  if (!isUserAuthed) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path={APP_ROUTES.projects} element={<Projects />} />
          <Route path={APP_ROUTES.addProject} element={<AddProject />} />
          <Route path="*" element={<Projects />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
