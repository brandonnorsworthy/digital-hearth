import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'

function NavItem({ to, label, icon, exact }: { to: string; label: string; icon: string; exact?: boolean }) {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: exact ?? to === '/' })

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all active:scale-90 ${
        match
          ? 'bg-primary-container text-on-surface'
          : 'text-on-surface-variant hover:opacity-80'
      }`}
    >
      <span
        className="material-symbols-outlined"
        style={match ? { fontVariationSettings: "'FILL' 1" } : undefined}
      >
        {icon}
      </span>
      <span className="text-[11px] font-semibold tracking-wide mt-0.5">{label}</span>
    </Link>
  )
}

interface LayoutProps {
  children: ReactNode
  title?: string
  focusMode?: boolean
  showFab?: boolean
  onFabClick?: () => void
}

export default function Layout({
  children,
  title = 'Digital Hearth',
  focusMode = false,
  showFab = false,
  onFabClick,
}: LayoutProps) {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-dvh bg-background text-on-surface">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-surface-container-low">
        {focusMode ? (
          <button
            onClick={() => navigate(-1)}
            className="text-primary p-2 rounded-full hover:bg-surface-container transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        ) : (
          <div className="w-10" />
        )}

        <h1
          className="absolute left-1/2 -translate-x-1/2 text-primary font-headline font-extrabold text-xl tracking-tight whitespace-nowrap"
        >
          {title}
        </h1>

        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-secondary-container border-2 border-primary-container flex items-center justify-center">
            <span className="text-on-secondary-container font-headline font-bold text-sm">
              {user?.username?.[0]?.toUpperCase() ?? 'U'}
            </span>
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-tertiary rounded-full border-2 border-surface flex items-center justify-center text-[10px] text-on-tertiary font-bold">
            3
          </span>
        </div>
      </header>

      {/* Scrollable content */}
      <main className={`pt-16 flex-1 overflow-y-auto overscroll-y-contain ${focusMode ? 'pb-12' : 'pb-36'}`}>
        {children}
      </main>

      {/* Bottom Nav */}
      {!focusMode && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/80 backdrop-blur-xl rounded-t-xl shadow-[0_-4px_20px_rgba(80,102,43,0.08)]">
          <NavItem to="/" label="Home" icon="home_app_logo" exact />
          <NavItem to="/tasks" label="Tasks" icon="assignment" />
          <NavItem to="/meals" label="Meals" icon="restaurant" />
          <NavItem to="/settings" label="Settings" icon="settings" />
        </nav>
      )}

      {/* FAB */}
      {showFab && (
        <button
          onClick={onFabClick}
          className="fixed bottom-24 right-6 z-40 w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/20 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}
    </div>
  )
}
