import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import MainPage from '@/pages/main/ui/page'
import { APP_ROUTES } from '@/shared/constants/routes'
import { ErrorBoundary } from '@/widgets/error-boundary'

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense>
        <Routes>
          <Route path={APP_ROUTES.main} element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
