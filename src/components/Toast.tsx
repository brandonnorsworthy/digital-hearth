import { useToast, type ToastVariant } from '../contexts/ToastContext'

const VARIANT_STYLES: Record<ToastVariant, string> = {
  error: 'bg-error text-on-error',
  success: 'bg-primary text-on-primary',
  info: 'bg-secondary-container text-on-secondary-container',
}

const VARIANT_ICONS: Record<ToastVariant, string> = {
  error: 'error',
  success: 'check_circle',
  info: 'info',
}

export function Toast() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-24 left-0 right-0 z-50 flex flex-col items-center gap-2 px-6 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg pointer-events-auto ${VARIANT_STYLES[toast.variant]}`}
        >
          <span
            className="material-symbols-outlined text-[18px] shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {VARIANT_ICONS[toast.variant]}
          </span>
          <span className="text-sm font-semibold">{toast.message}</span>
          <button
            onClick={() => dismiss(toast.id)}
            className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  )
}
