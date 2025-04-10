"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ResumeData } from "@/lib/validators/resume";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Props = {
  form: UseFormReturn<ResumeData>;
};

export function EducationFormList({ form }: Props) {
  const { control, register, formState: { errors } } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-fg">教育经历</h2>
      {errors.education && (
        <p className="text-danger text-sm mb-4">
          {errors.education.message}
        </p>
      )}
      

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-border bg-surface p-4 rounded-2xl mb-4 space-y-4 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 学校 */}
            <div>
              <label className="block font-medium text-fg">学校 *</label>
              <input
                {...register(`education.${index}.school`)}
                className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
              />
              {errors.education?.[index]?.school && (
                <p className="text-danger text-sm mt-1">
                  {errors.education[index]?.school?.message}
                </p>
              )}
            </div>

            {/* 学位 */}
            <div>
              <label className="block font-medium text-fg">学位 *</label>
              <input
                {...register(`education.${index}.degree`)}
                className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
              />
              {errors.education?.[index]?.degree && (
                <p className="text-danger text-sm mt-1">
                  {errors.education[index]?.degree?.message}
                </p>
              )}
            </div>

            {/* 开始日期 */}
            <div>
              <label className="block font-medium text-fg">开始日期 *</label>
              <input
                type="date"
                {...register(`education.${index}.startDate`)}
                className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
              />
            </div>

            {/* 结束日期 */}
            <div>
              <label className="block font-medium text-fg">结束日期 *</label>
              <input
                type="date"
                {...register(`education.${index}.endDate`)}
                className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
              />
            </div>

            {/* GPA */}
            <div className="md:col-span-2">
              <label className="block font-medium text-fg">GPA</label>
              <input
                {...register(`education.${index}.gpa`)}
                className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* 描述 */}
          <div>
            <label className="block font-medium text-fg">描述</label>
            <textarea
              {...register(`education.${index}.description`)}
              className="w-full bg-surface text-fg border border-border rounded px-3 py-2 min-h-[80px]"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-sm text-danger hover:underline"
            >
              删除此项
            </button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            school: "",
            degree: "",
            startDate: "",
            endDate: "",
            gpa: "",
            description: "",
          })
        }
        variant="secondary"
      >
        <Plus size={16} className="mr-2" />
        添加教育经历
      </Button>
    </section>
  );
}
