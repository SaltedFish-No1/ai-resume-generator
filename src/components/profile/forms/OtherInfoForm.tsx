'use client'

import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { ResumeData } from '@/types/resume'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Props {
    form: UseFormReturn<ResumeData>
}

export function OtherInfoForm({ form }: Props) {
    const {
        register,
        control,
        formState: { errors },
    } = form

    const pubField = useFieldArray({ control, name: 'publications' })
    const awardField = useFieldArray({ control, name: 'awards' })
    const certField = useFieldArray({ control, name: 'certifications' })

    return (
        <section className="space-y-10">
            {/* 👇 学术出版物 */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-fg">学术出版物 / 著作</h2>
                {pubField.fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="space-y-4 border border-border rounded-xl p-4 mb-4 bg-surface"
                    >
                        <input
                            {...register(`publications.${index}.title`)}
                            placeholder="标题 *"
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <input
                            {...register(`publications.${index}.journal`)}
                            placeholder="期刊 / 出版物"
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <input
                            {...register(`publications.${index}.authors`)}
                            placeholder="作者"
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <input
                            type="date"
                            {...register(`publications.${index}.date`)}
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <input
                            placeholder="链接"
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                            defaultValue={field.link}
                            onChange={(e) => {
                                const value = e.target.value.trim()
                                form.setValue(`publications.${index}.link`, value === '' ? undefined : value)
                            }}
                        />

                        <textarea
                            {...register(`publications.${index}.summary`)}
                            placeholder="简介"
                            className="w-full border border-border rounded px-3 py-2 bg-surface min-h-[80px]"
                        />
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => pubField.remove(index)}
                                className="text-muted-foreground hover:text-danger"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => pubField.append({ title: '' })}>
                    <Plus className="mr-2" size={16} /> 添加出版物
                </Button>
            </div>

            {/* 👇 奖项 */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-fg">奖项</h2>
                {awardField.fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="space-y-4 border border-border rounded-xl p-4 mb-4 bg-surface"
                    >
                        <input
                            {...register(`awards.${index}.title`)}
                            placeholder="奖项名称"
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <input
                            {...register(`awards.${index}.issuer`)}
                            placeholder="颁发机构"
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <input
                            type="date"
                            {...register(`awards.${index}.date`)}
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => awardField.remove(index)}
                                className="text-muted-foreground hover:text-danger"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => awardField.append({})}>
                    <Plus className="mr-2" size={16} /> 添加奖项
                </Button>
            </div>

            {/* 👇 证书 */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-fg">证书</h2>
                {certField.fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="space-y-4 border border-border rounded-xl p-4 mb-4 bg-surface"
                    >
                        <input
                            {...register(`certifications.${index}.name`)}
                            placeholder="证书名称"
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <input
                            {...register(`certifications.${index}.issuer`)}
                            placeholder="颁发机构"
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <input
                            type="date"
                            {...register(`certifications.${index}.date`)}
                            className="w-full border border-border rounded px-3 py-2 bg-surface"
                        />
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => certField.remove(index)}
                                className="text-muted-foreground hover:text-danger"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => certField.append({})}>
                    <Plus className="mr-2" size={16} /> 添加证书
                </Button>
            </div>
        </section>
    )
}
