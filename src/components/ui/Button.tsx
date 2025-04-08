// src/components/ui/Button.tsx

interface ButtonProps {
    variant?: 'primary' | 'secondary'
    children: React.ReactNode
    href?: string
    className?: string
}

export function Button({
    variant = 'primary',
    href,
    className = '',
    children,
}: ButtonProps) {
    const base =
        'px-6 py-3 rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'

    const variants = {
        primary:
            'bg-primary text-surface hover:bg-primary-hover active:bg-primary-active shadow-sm hover:shadow-md',
        secondary:
            'bg-primary-subtle text-primary border border-primary/30 hover:bg-primary/10',
    }

    const composed = `${base} ${variants[variant]} ${className}`

    if (href) {
        return (
            <a href={href} className={composed}>
                {children}
            </a>
        )
    }

    return <button className={composed}>{children}</button>
}
