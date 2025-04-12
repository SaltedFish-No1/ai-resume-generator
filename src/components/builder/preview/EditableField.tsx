// 新增组件：components/preview/EditableField.tsx
'use client'

import { useState } from 'react'
import { Pencil, Sparkles } from 'lucide-react'

interface EditableFieldProps {
  value: string
  onChange: (val: string) => void
  onOptimize?: () => void
}

export default function EditableField({ value, onChange, onOptimize }: EditableFieldProps) {
  const [editing, setEditing] = useState(false)

  return (
    <div
      className="relative group bg-[hsl(var(--highlight))] rounded-md p-2 hover:shadow-sm"
      onDoubleClick={() => setEditing(true)}
    >
      {editing ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          autoFocus
          className="w-full bg-transparent resize-none focus:outline-none text-sm p-1 rounded"
        />
      ) : (
        <p className="text-sm leading-relaxed whitespace-pre-wrap cursor-text text-[hsl(var(--fg))]">
          {value || <span className="italic text-muted-foreground">点击编辑内容...</span>}
        </p>
      )}

      {/* 按钮区：右上角排成一行 */}
      {!editing && (
        <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onOptimize && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOptimize()
              }}
              className="p-1 rounded-full bg-white/80 hover:bg-white text-sm text-[hsl(var(--primary))] shadow"
            >
              <Sparkles size={16} />
            </button>
          )}

          <button
            onClick={() => setEditing(true)}
            className="p-1 rounded-full text-muted-foreground hover:text-[hsl(var(--primary))]"
          >
            <Pencil size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
