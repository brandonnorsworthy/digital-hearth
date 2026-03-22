/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { householdService } from '../services/household'
import type { Household, Member } from '../types/api'

interface HouseholdContextValue {
  household: Household | null
  members: Member[]
  isLoading: boolean
  error: string | null
  reload: () => void
}

const HouseholdContext = createContext<HouseholdContextValue | null>(null)

export function HouseholdProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [household, setHousehold] = useState<Household | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    if (!user?.householdId) return
    setIsLoading(true)
    setError(null)
    Promise.all([
      householdService.get(user.householdId),
      householdService.members(user.householdId),
    ])
      .then(([h, m]) => {
        setHousehold(h)
        setMembers(m)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load household.')
        console.error(err)
      })
      .finally(() => setIsLoading(false))
  }, [user])

  useEffect(() => {
    if (user?.householdId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      load()
    } else {
      setHousehold(null)
      setMembers([])
    }
  }, [load, user?.householdId])

  return (
    <HouseholdContext.Provider value={{ household, members, isLoading, error, reload: load }}>
      {children}
    </HouseholdContext.Provider>
  )
}

export function useHousehold() {
  const ctx = useContext(HouseholdContext)
  if (!ctx) throw new Error('useHousehold must be used within HouseholdProvider')
  return ctx
}
