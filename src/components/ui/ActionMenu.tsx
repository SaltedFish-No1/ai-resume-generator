// components/ui/ActionMenu.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ActionMenu({
  button,
  items,
}: {
  button: React.ReactNode
  items: { label: string; icon?: React.ReactNode; onClick: () => void }[]
}) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)}>{button}</button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-surface shadow z-50"
          >
            {items.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setOpen(false)
                  item.onClick()
                }}
                className="px-4 py-2 text-sm hover:bg-highlight cursor-pointer flex gap-2 items-center"
              >
                {item.icon}
                {item.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
