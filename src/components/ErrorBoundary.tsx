import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : 'Something went wrong.'
    return { hasError: true, message }
  }

  componentDidCatch(error: unknown, info: { componentStack: string }) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-dvh bg-background flex flex-col items-center justify-center gap-4 px-8 text-center">
          <span
            className="material-symbols-outlined text-error text-5xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            error
          </span>
          <p className="font-headline font-bold text-xl text-on-surface">Something went wrong</p>
          <p className="text-sm text-on-surface-variant">{this.state.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, message: '' })}
            className="mt-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
