import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { validatePassword } from '../utils/password'

export default function CreateHousehold() {
  const { createHousehold } = useAuth()
  const navigate = useNavigate()

  const [householdName, setHouseholdName] = useState('')
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setError(null)

    const passwordError = validatePassword(pin)
    if (passwordError) {
      setError(passwordError)
      return
    }
    if (pin !== confirmPin) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await createHousehold(householdName.trim(), username.trim(), pin)
      // Auth state change causes ProtectedRoute to render the app
      navigate('/', { replace: true })
    } catch {
      setError('Failed to create household. The username may already be taken.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-dvh bg-background flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Logo mark */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-xl bg-primary-container flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            home_app_logo
          </span>
        </div>
        <div className="text-center">
          <h1 className="font-headline font-extrabold text-2xl text-primary tracking-tight">
            Digital Hearth
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">Create your household.</p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="householdName" className="text-sm font-semibold text-on-surface-variant ml-1">
              Household Name
            </label>
            <input
              id="householdName"
              type="text"
              value={householdName}
              onChange={e => setHouseholdName(e.target.value)}
              required
              placeholder="e.g. The Smiths"
              className="bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface font-medium placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm font-semibold text-on-surface-variant ml-1">
              Your Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="e.g. Sarah"
              className="bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface font-medium placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="pin" className="text-sm font-semibold text-on-surface-variant ml-1">
              Password
            </label>
            <input
              id="pin"
              type="password"
              autoComplete="new-password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              required
              placeholder="••••••••••••"
              className="bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface font-medium placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPin" className="text-sm font-semibold text-on-surface-variant ml-1">
              Confirm Password
            </label>
            <input
              id="confirmPin"
              type="password"
              autoComplete="new-password"
              value={confirmPin}
              onChange={e => setConfirmPin(e.target.value)}
              required
              placeholder="••••••••••••"
              className="bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface font-medium placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-error font-medium text-center -mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-linear-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-base shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1 disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {loading ? 'progress_activity' : 'add_home'}
            </span>
            {loading ? 'Creating…' : 'Create Household'}
          </button>
        </form>
      </div>

      {/* Back to login */}
      <button
        onClick={() => navigate('/', { replace: true })}
        className="mt-6 text-sm font-semibold text-on-surface-variant"
      >
        Already have an account? <span className="text-primary">Sign in</span>
      </button>
    </div>
  )
}
