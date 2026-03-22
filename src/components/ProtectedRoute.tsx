import Login from '../pages/Login'
import { useAuth } from '../contexts/AuthContext'

// Renders the login screen IN PLACE (no URL change) when not authenticated.
// This keeps the PWA in standalone mode on iOS — redirecting to /login would
// cause Safari to exit standalone and show browser chrome.
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
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
