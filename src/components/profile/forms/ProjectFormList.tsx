"use client";

import { UseFormReturn, useFieldArray, Controller } from "react-hook-form";
import { ResumeData } from "@/lib/validators/resume";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  form: UseFormReturn<ResumeData>;
}

export function ProjectFormList({ form }: Props) {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-fg">项目经历</h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-border bg-surface p-4 rounded-2xl mb-4 space-y-4 shadow-sm"
        >
          {/* 项目名称 */}
          <div>
            <label className="block font-medium text-fg">项目名称 *</label>
            <input
              {...register(`projects.${index}.name`)}
              className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
            />
          </div>

          {/* 技术栈 */}
          <div>
            <label className="block font-medium text-fg">
              技术栈（多个用英文逗号分隔）
            </label>
            <Controller
              control={control}
              name={`projects.${index}.techStack`}
              render={({ field }) => (
                <input
                  value={
                    Array.isArray(field.value)
                      ? field.value.join(", ")
                      : field.value || ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="React, Tailwind CSS, Firebase"
                  className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
                />
              )}
            />
          </div>

          {/* 描述 */}
          <div>
            <label className="block font-medium text-fg">项目描述 *</label>
            <textarea
              {...register(`projects.${index}.description`)}
              className="w-full bg-surface text-fg border border-border rounded px-3 py-2 min-h-[80px]"
            />
          </div>

          {/* 链接 */}
          <div>
            <label className="block font-medium text-fg">项目链接（可选）</label>
            <input
              type="url"
              placeholder="https://github.com/your-project"
              {...register(`projects.${index}.link`)}
              className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
            />
          </div>

          {/* 删除按钮 */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-muted hover:text-danger transition"
              title="删除项目"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* 添加按钮 */}
      <div className="mt-4">
        <Button
          type="button"
          onClick={() =>
            append({ name: "", techStack: [], description: "", link: "" })
          }
          variant="secondary"
        >
          <Plus size={16} />
          添加项目
        </Button>
      </div>
    </section>
  );
}
