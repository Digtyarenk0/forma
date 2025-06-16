import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { LoginPage } from '@/pages/login'
import { RegisterPage } from '@/pages/registration'
import { APP_ROUTES } from '@/shared/constants/routes'
import { ErrorBoundary } from '@/widgets/error-boundary'

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense>
        <Routes>
          <Route path={APP_ROUTES.main} element={<LoginPage />} />
          <Route path={APP_ROUTES.login} element={<LoginPage />} />
          <Route path={APP_ROUTES.register} element={<RegisterPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
