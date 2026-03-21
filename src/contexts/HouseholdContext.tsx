import { createContext, useContext, type ReactNode } from 'react'
import { MOCK_HOUSEHOLD, MOCK_MEMBERS } from '../mock/data'

interface HouseholdContextValue {
  household: typeof MOCK_HOUSEHOLD
  members: typeof MOCK_MEMBERS
}

const HouseholdContext = createContext<HouseholdContextValue | null>(null)

export function HouseholdProvider({ children }: { children: ReactNode }) {
  return (
    <HouseholdContext.Provider value={{ household: MOCK_HOUSEHOLD, members: MOCK_MEMBERS }}>
      {children}
    </HouseholdContext.Provider>
  )
}

export function useHousehold() {
  const ctx = useContext(HouseholdContext)
  if (!ctx) throw new Error('useHousehold must be used within HouseholdProvider')
  return ctx
}
