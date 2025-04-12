'use client'

import { UseFormReturn, useFieldArray, Controller } from 'react-hook-form'
import { ResumeData } from '@/types/resume'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { parseISO } from 'date-fns'

type Props = {
  form: UseFormReturn<ResumeData>
}

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2 items-start mb-4">
      <div {...listeners} {...attributes} className="cursor-grab pt-2 text-muted-foreground">
        <GripVertical size={16} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export function EducationFormList({ form }: Props) {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors }
  } = form

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'education'
  })

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id)
      const newIndex = fields.findIndex((f) => f.id === over.id)
      move(oldIndex, newIndex)
    }
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-fg">教育经历</h2>

      {errors.education && (
        <p className="text-danger text-sm mb-4">{errors.education.message}</p>
      )}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {fields.map((field, index) => (
            <SortableItem key={field.id} id={field.id}>
              <div className="border border-border bg-surface rounded-2xl p-4 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 学校 */}
                  <div>
                    <label className="block font-medium text-fg mb-1">学校 *</label>
                    <input
                      {...register(`education.${index}.school`)}
                      className="w-full bg-surface border border-border rounded px-3 py-2 text-sm text-fg"
                    />
                    {errors.education?.[index]?.school && (
                      <p className="text-danger text-sm mt-1">{errors.education[index]?.school?.message}</p>
                    )}
                  </div>

                  {/* 学位 */}
                  <div>
                    <label className="block font-medium text-fg mb-1">学位 *</label>
                    <input
                      {...register(`education.${index}.degree`)}
                      className="w-full bg-surface border border-border rounded px-3 py-2 text-sm text-fg"
                    />
                    {errors.education?.[index]?.degree && (
                      <p className="text-danger text-sm mt-1">{errors.education[index]?.degree?.message}</p>
                    )}
                  </div>
                </div>

                {/* 日期和 GPA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-full md:col-span-1">
                    <label className="block font-medium text-fg mb-1">开始日期 *</label>
                    <input
                      type="date"
                      {...register(`education.${index}.startDate`)}
                      className="w-full bg-surface text-fg border border-border rounded px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="col-span-full md:col-span-1">
                    <label className="block font-medium text-fg mb-1">结束日期 *</label>
                    <input
                      type="date"
                      {...register(`education.${index}.endDate`)}
                      className="w-full bg-surface text-fg border border-border rounded px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="col-span-full md:col-span-1">
                    <label className="block font-medium text-fg mb-1">GPA</label>
                    <input
                      {...register(`education.${index}.gpa`)}
                      className="w-full bg-surface text-fg border border-border rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>



                {/* 描述 */}
                <div>
                  <label className="block font-medium text-fg mb-1">描述</label>
                  <textarea
                    {...register(`education.${index}.description`)}
                    className="w-full bg-surface border border-border rounded px-3 py-2 min-h-[80px] text-sm text-fg"
                  />
                </div>

                {/* 删除按钮 */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-muted-foreground hover:text-danger transition text-sm"
                    aria-label="删除教育经历"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      {/* 添加按钮 */}
      <div className="mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              school: '',
              degree: '',
              startDate: '',
              endDate: '',
              gpa: '',
              description: ''
            })
          }
        >
          <Plus size={16} className="mr-2" />
          添加教育经历
        </Button>
      </div>
    </section>
  )
}
