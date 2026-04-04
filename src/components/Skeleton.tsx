import type React from 'react'

export default function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`animate-pulse rounded-lg bg-surface-container ${className}`} style={style} />
  )
}
