"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ResumeData } from "@/lib/validators/resume";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  form: UseFormReturn<ResumeData>;
}

export function ExperienceFormList({ form }: Props) {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-fg">工作 / 实习经历</h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-border bg-surface p-4 rounded-2xl mb-4 space-y-4 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-fg">公司 *</label>
              <input
                {...register(`experience.${index}.company`)}
                className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-fg">职位 *</label>
              <input
                {...register(`experience.${index}.title`)}
                className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-fg">开始日期 *</label>
              <input
                type="date"
                {...register(`experience.${index}.startDate`)}
                className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-fg">结束日期 *</label>
              <input
                type="date"
                {...register(`experience.${index}.endDate`)}
                className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-fg">描述 *</label>
            <textarea
              {...register(`experience.${index}.description`)}
              className="w-full bg-surface text-fg border border-border rounded px-3 py-2 min-h-[80px]"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-muted hover:text-danger transition"
              title="删除经历"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}


      <Button
        type="button"
        onClick={() =>
          append({
            company: "",
            title: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
        variant="secondary" // 或者 primary，根据语义选择
        className="mt-2"
      >
        <Plus size={16} />
        添加经历
      </Button>

    </section>
  );
}