'use client'

import { createContext, useContext, useState, useCallback } from 'react'

type ToastType = 'default' | 'error' | 'success'

interface ToastMessage {
  id: number
  type: ToastType
  title: string
  description?: string
}

interface ToastContextValue {
  showToast: (msg: Omit<ToastMessage, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const showToast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = Date.now()
    setMessages((prev) => [...prev, { ...msg, id }])
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast 显示区域 */}
      <div className="fixed bottom-6 right-6 space-y-2 z-50">
        {messages.map(({ id, title, description, type }) => (
          <div
            key={id}
            className={`px-4 py-3 rounded-md border shadow-lg text-sm transition-all duration-300
              bg-[hsl(var(--surface))] text-[hsl(var(--fg))] border-[hsl(var(--border))]
              ${type === 'error' ? 'border-red-500 text-red-600' : ''}
              ${type === 'success' ? 'border-green-500 text-green-600' : ''}
            `}
          >
            <strong>{title}</strong>
            {description && <p className="mt-1">{description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
