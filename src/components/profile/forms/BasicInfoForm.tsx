'use client'

import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { ResumeData } from '@/types/resume'
import { sanitizeString, setValueAsUrl } from '@/lib/utils/formUtils'
import { Plus, Trash2 } from 'lucide-react'

type Props = {
  form: UseFormReturn<ResumeData>
}

export function BasicInfoForm({ form }: Props) {
  const {
    register,
    control,
    formState: { errors }
  } = form

  const {
    fields: socialLinks,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'socialLinks'
  })

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-fg">基本信息</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 姓名 */}
        <div>
          <label className="block font-medium mb-1 text-fg">姓名 *</label>
          <input
            {...register('fullName')}
            className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
          />
          {errors.fullName && (
            <p className="text-danger text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* 邮箱 */}
        <div>
          <label className="block font-medium mb-1 text-fg">邮箱 *</label>
          <input
            type="email"
            {...register('email')}
            className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-danger text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* 电话 */}
        <div>
          <label className="block font-medium mb-1 text-fg">电话</label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
          />
          {errors.phone && (
            <p className="text-danger text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* 当前职位 */}
        <div>
          <label className="block font-medium mb-1 text-fg">当前职位</label>
          <input
            type="text"
            {...register('jobTitle')}
            className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
          />
        </div>

        {/* 入职时间 */}
        <div>
          <label className="block font-medium mb-1 text-fg">可入职时间</label>
          <input
            type="text"
            {...register('availability')}
            placeholder="例如：立即 / 两周内 / 1个月后"
            className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
          />
        </div>

        {/* 地理偏好 */}
        <div>
          <label className="block font-medium mb-1 text-fg">工作地点偏好</label>
          <input
            type="text"
            {...register('locationPreference')}
            placeholder="例如：北京 / 上海 / Remote"
            className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* 社交链接（含 GitHub / LinkedIn） */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-fg">社交链接</h3>
          <button
            type="button"
            onClick={() => append({ label: '', url: '' })}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <Plus size={16} />
            添加链接
          </button>
        </div>

        {socialLinks.length === 0 && (
          <p className="text-muted-foreground text-sm pl-1">你可以添加 GitHub、LinkedIn、Blog 等任意链接</p>
        )}

        {socialLinks.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-12 gap-2 items-center border border-border rounded px-3 py-2 bg-highlight"
          >
            <input
              placeholder="标签（如 GitHub / Blog）"
              {...register(`socialLinks.${index}.label` as const)}
              className="col-span-4 bg-surface text-fg border border-border rounded px-2 py-1 text-sm"
            />
            <input
              placeholder="链接地址（https://...）"
              {...register(`socialLinks.${index}.url` as const, {
                setValueAs: setValueAsUrl
              })}
              className="col-span-7 bg-surface text-fg border border-border rounded px-2 py-1 text-sm"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="col-span-1 text-muted-foreground hover:text-danger"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* 简介 */}
      <div className="mt-6">
        <label className="block font-medium mb-1 text-fg">个人简介</label>
        <textarea
          {...register('summary', { setValueAs: sanitizeString })}
          placeholder="简要介绍你的职业背景、核心能力、求职目标等..."
          className="w-full bg-surface text-fg border border-border rounded px-3 py-2 min-h-[100px]"
        />
      </div>
    </section>
  )
}
