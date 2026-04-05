import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { HouseholdProvider } from './contexts/HouseholdContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toast } from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import EditTask from './pages/EditTask'
import MealPlanner from './pages/MealPlanner'
import MealLibrary from './pages/MealLibrary'
import TaskLibrary from './pages/TaskLibrary'
import Settings from './pages/Settings'
import CreateHousehold from './pages/CreateHousehold'
import JoinHousehold from './pages/JoinHousehold'
import { notificationService } from './services/notifications'


function AppRoutes() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user || !('serviceWorker' in navigator)) return
    navigator.serviceWorker.ready.then(async (reg) => {
      const sub = await reg.pushManager.getSubscription()
      if (sub) await notificationService.subscribe(sub.toJSON()).catch(() => {})
    })
  }, [user])

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
      <Route path="/tasks/library" element={<ProtectedRoute><TaskLibrary /></ProtectedRoute>} />
      <Route path="/tasks/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
      <Route path="/meals" element={<ProtectedRoute><MealPlanner /></ProtectedRoute>} />
      <Route path="/meals/library" element={<ProtectedRoute><MealLibrary /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/setup" element={<CreateHousehold />} />
      <Route path="/join" element={<JoinHousehold />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <HouseholdProvider>
              <ToastProvider>
                <AppRoutes />
                <Toast />
              </ToastProvider>
            </HouseholdProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
