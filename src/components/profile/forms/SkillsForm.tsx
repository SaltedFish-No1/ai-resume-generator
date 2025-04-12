'use client'

import { UseFormReturn, Controller } from 'react-hook-form'
import { ResumeData } from '@/types/resume'
import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { SliderWithLabel } from '@/components/ui/SliderWithLable'

type Props = {
  form: UseFormReturn<ResumeData>
}

export function SkillsForm({ form }: Props) {
  const { control } = form
  const [inputValue, setInputValue] = useState('')

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-fg">技能列表</h2>

      <Controller
        name="skills"
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const skills = field.value ?? []
          const { onChange } = field

          const addSkill = () => {
            const trimmed = inputValue.trim()
            if (!trimmed) return
            if (skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) return

            onChange([...skills, { name: trimmed, level: 5 }])
            setInputValue('')
          }

          const removeSkill = (index: number) => {
            const updated = skills.filter((_, i) => i !== index)
            onChange(updated)
          }

          const updateLevel = (index: number, newLevel: number) => {
            const updated = [...skills]
            updated[index].level = newLevel
            onChange(updated)
          }

          return (
            <>
              {/* 输入添加区域 */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                  placeholder="输入技能名后点击添加"
                  className="flex-1 bg-surface text-fg border border-border rounded px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  disabled={!inputValue.trim()}
                  aria-label="添加技能"
                  className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary-hover disabled:opacity-50 transition flex items-center gap-1"
                >
                  <Plus size={16} />
                  添加
                </button>
              </div>

              {/* 技能列表 */}
              {skills.length === 0 ? (
                <p className="text-sm text-muted-foreground">暂无技能，请先添加</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-fg font-medium truncate">{skill.name}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="text-muted-foreground hover:text-danger"
                          aria-label={`删除 ${skill.name}`}
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <SliderWithLabel
                        value={skill.level}
                        onChange={(val) => updateLevel(index, val)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )
        }}
      />
    </section>
  )
}
