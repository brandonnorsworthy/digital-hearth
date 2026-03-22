import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { householdService } from '../services/household'
import type { Household, Member } from '../types/api'

interface HouseholdContextValue {
  household: Household | null
  members: Member[]
  reload: () => void
}

const HouseholdContext = createContext<HouseholdContextValue | null>(null)

export function HouseholdProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [household, setHousehold] = useState<Household | null>(null)
  const [members, setMembers] = useState<Member[]>([])

  function load() {
    if (!user?.householdId) return
    householdService.get(user.householdId).then(setHousehold).catch(console.error)
    householdService.members(user.householdId).then(setMembers).catch(console.error)
  }

  useEffect(() => {
    if (user?.householdId) {
      load()
    } else {
      setHousehold(null)
      setMembers([])
    }
  }, [user?.householdId])

  return (
    <HouseholdContext.Provider value={{ household, members, reload: load }}>
      {children}
    </HouseholdContext.Provider>
  )
}

export function useHousehold() {
  const ctx = useContext(HouseholdContext)
  if (!ctx) throw new Error('useHousehold must be used within HouseholdProvider')
  return ctx
}
