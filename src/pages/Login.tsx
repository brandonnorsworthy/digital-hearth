import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    // No navigate() call — auth state change causes ProtectedRoute to
    // re-render in-place, keeping the URL stable and the PWA in standalone mode.
    login(username, pin)
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
          <p className="text-on-surface-variant text-sm mt-1">Your household, in sync.</p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm font-semibold text-on-surface-variant ml-1">
              Username
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
              PIN
            </label>
            <input
              id="pin"
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              required
              placeholder="••••"
              className="bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface font-medium placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-base shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              login
            </span>
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-on-surface-variant/60 mt-4">
          Demo mode — any username &amp; PIN works
        </p>
      </div>
    </div>
  )
}
