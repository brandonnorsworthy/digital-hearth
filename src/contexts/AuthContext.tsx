import { createContext, useContext, useState, type ReactNode } from 'react'
import { MOCK_USER } from '../mock/data'

interface User {
  id: number
  username: string
  householdId: number
}

interface AuthContextValue {
  user: User | null
  login: (username: string, pin: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  function login(_username: string, _pin: string) {
    // Demo: any credentials succeed, loads mock user
    setUser(MOCK_USER)
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
