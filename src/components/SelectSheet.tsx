import { useEffect } from 'react'

interface SelectSheetProps {
  title: string
  options: string[]
  value: string
  onSelect: (option: string) => void
  onClose: () => void
}

export default function SelectSheet({ title, options, value, onSelect, onClose }: SelectSheetProps) {
  // Close on backdrop click or Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-60 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-t-xl w-full max-w-xl shadow-2xl flex flex-col max-h-[85dvh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-8 pt-4 pb-6 flex items-center justify-between shrink-0">
          <h3 className="font-headline text-2xl font-bold text-on-surface">{title}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Options — scrollable with fade indicator */}
        <div className="relative flex-1 min-h-0 overflow-y-auto px-6 pb-8 space-y-2">
          {options.map(option => {
            const selected = option === value
            return (
              <button
                key={option}
                onClick={() => { onSelect(option); onClose() }}
                className={`w-full flex items-center justify-between px-6 py-5 rounded-full transition-all active:scale-95 ${
                  selected
                    ? 'bg-primary-container text-on-primary-container'
                    : 'hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className={`font-body text-lg ${selected ? 'font-semibold' : ''}`}>{option}</span>
                {selected && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-on-primary text-sm"
                      style={{ fontVariationSettings: "'wght' 700" }}
                    >
                      check
                    </span>
                  </div>
                )}
              </button>
            )
          })}
          {/* Gradient fade to hint at scrollable content */}
          <div className="pointer-events-none sticky bottom-0 left-0 right-0 h-12 bg-linear-to-t from-surface to-transparent -mx-6" />
        </div>
      </div>
    </div>
  )
}
