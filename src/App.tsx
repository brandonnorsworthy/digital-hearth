import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { HouseholdProvider } from './contexts/HouseholdContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import EditTask from './pages/EditTask'
import MealPlanner from './pages/MealPlanner'
import Settings from './pages/Settings'
import { notificationService } from './services/notifications'

// Renders the login screen IN PLACE (no URL change) when not authenticated.
// This keeps the PWA in standalone mode on iOS — redirecting to /login would
// cause Safari to exit standalone and show browser chrome.
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="h-dvh bg-background flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-4xl animate-spin" style={{ fontVariationSettings: "'FILL' 1" }}>
          progress_activity
        </span>
      </div>
    )
  }

  return user ? <>{children}</> : <Login />
}

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
      <Route path="/tasks/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
      <Route path="/meals" element={<ProtectedRoute><MealPlanner /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HouseholdProvider>
          <AppRoutes />
        </HouseholdProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
