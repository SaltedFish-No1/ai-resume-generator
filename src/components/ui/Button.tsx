// src/components/ui/Button.tsx
import clsx from 'clsx'
import LoadingIndicator from './LoadingIndicator'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  href?: string
  className?: string
  isLoading?: boolean
  disabled?: boolean
  loadingText?: string
}

export function Button({
  variant = 'primary',
  href,
  className = '',
  children,
  isLoading = false,
  disabled = false,
  loadingText = '加载中...',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'

  const variants = {
    primary:
      'bg-primary text-surface hover:bg-primary-hover active:bg-primary-active shadow-sm hover:shadow-md',
    secondary:
      'bg-primary-subtle text-primary border border-primary/30 hover:bg-primary/10',
  }

  const composed = clsx(base, variants[variant], className)

  const content = isLoading ? (
    <>
      <LoadingIndicator text={loadingText} size={20} />
    </>
  ) : (
    children
  )

  if (href) {
    return (
      <a href={href} className={composed} aria-disabled={isLoading}>
        {content}
      </a>
    )
  }

  return (
    <button className={composed} disabled={isLoading || disabled}>
      {content}
    </button>
  )
}
