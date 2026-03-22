import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

const PULL_THRESHOLD = 72
const INDICATOR_HEIGHT = 52

function NavItem({ to, label, icon, exact }: { to: string; label: string; icon: string; exact?: boolean }) {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: exact ?? to === '/' })

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all active:scale-90 ${match
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
  subtitle?: string
  focusMode?: boolean
  showFab?: boolean
  onFabClick?: () => void
  onRefresh?: () => Promise<void>
}

export default function Layout({
  children,
  title = 'Digital Hearth',
  subtitle,
  focusMode = false,
  showFab = false,
  onFabClick,
  onRefresh,
}: LayoutProps) {
  const navigate = useNavigate()
  const mainRef = useRef<HTMLElement>(null)
  const touchStartY = useRef(0)
  const isPullingRef = useRef(false)

  const [pullY, setPullY] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const indicatorH = isRefreshing || isAnimating
    ? INDICATOR_HEIGHT
    : Math.round((pullY / PULL_THRESHOLD) * INDICATOR_HEIGHT)

  function handleTouchStart(e: React.TouchEvent) {
    if (!onRefresh || isRefreshing) return
    touchStartY.current = e.touches[0].clientY
    isPullingRef.current = false
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!onRefresh || isRefreshing) return
    const main = mainRef.current
    if (!main || main.scrollTop > 0) return

    const deltaY = e.touches[0].clientY - touchStartY.current
    if (deltaY <= 0) return

    isPullingRef.current = true
    setPullY(Math.min(deltaY * 0.5, PULL_THRESHOLD))
  }

  async function handleTouchEnd() {
    if (!onRefresh || !isPullingRef.current) return
    isPullingRef.current = false

    if (pullY >= PULL_THRESHOLD) {
      setIsAnimating(false)
      setIsRefreshing(true)
      setPullY(0)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    } else {
      setIsAnimating(true)
      setPullY(0)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-on-surface">
      {/* Top App Bar */}
      <header className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 bg-surface-container-low ${subtitle ? 'h-20' : 'h-16'}`}>
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

        <div className="flex flex-col items-center">
          <h1 className="text-primary font-headline font-extrabold text-xl tracking-tight whitespace-nowrap">
            {title}
          </h1>
          {subtitle && (
            <p className="text-on-surface-variant text-xs font-semibold tracking-widest uppercase mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-10" />
      </header>

      {/* Scrollable content */}
      <main
        ref={mainRef}
        className={`${subtitle ? 'pt-20' : 'pt-16'} flex-1 overflow-y-auto overscroll-y-contain ${focusMode ? 'pb-12' : 'pb-24'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull-to-refresh indicator */}
        {onRefresh && (
          <div
            className={`overflow-hidden flex items-center justify-center ${isAnimating || isRefreshing ? 'transition-[height] duration-300' : ''}`}
            style={{ height: indicatorH }}
          >
            <span
              className={`material-symbols-outlined text-primary ${isRefreshing ? 'animate-spin' : ''}`}
              style={{
                fontVariationSettings: "'FILL' 1",
                transform: !isRefreshing
                  ? `rotate(${Math.round((pullY / PULL_THRESHOLD) * 360)}deg)`
                  : undefined,
              }}
            >
              {isRefreshing ? 'progress_activity' : 'refresh'}
            </span>
          </div>
        )}

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
          className="fixed bottom-28 right-6 z-40 w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/20 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}
    </div>
  )
}
