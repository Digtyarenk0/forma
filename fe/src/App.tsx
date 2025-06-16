import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { Sidebar } from './components/Sidebar'
import { useAuth } from './hooks/useAuth'
import { AddProject } from './pages/AddProject'
import { LoginPage } from './pages/login'
import { Projects } from './pages/Projects'
import { APP_ROUTES } from './shared/constants/routes'

const App = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path={APP_ROUTES.main} element={<Navigate to={APP_ROUTES.projects} replace />} />
            <Route path={APP_ROUTES.projects} element={<Projects />} />
            <Route path={APP_ROUTES.addProject} element={<AddProject />} />
            <Route path="*" element={<LoginPage />} />
            {/*  */}
            {!user && <Navigate to={APP_ROUTES.login} replace />}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
