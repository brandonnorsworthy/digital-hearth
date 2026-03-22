/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authService } from '../services/auth'
import { ApiError } from '../services/api'
import type { User } from '../types/api'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (username: string, pin: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    authService
      .me()
      .then(setUser)
      .catch((err) => {
        // 401 means no active session — expected on first visit
        if (!(err instanceof ApiError && err.status === 401)) {
          console.error('Session restore failed:', err)
        }
        setUser(null)
      })
      .finally(() => setIsLoading(false))
  }, [])

  async function login(username: string, pin: string) {
    const u = await authService.login(username, pin)
    setUser(u)
  }

  async function logout() {
    await authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
