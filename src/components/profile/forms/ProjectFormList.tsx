"use client";

import { UseFormReturn, useFieldArray, Controller } from "react-hook-form";
import { ResumeData } from "@/lib/validators/resume";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

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
      <h2 className="text-xl font-semibold mb-4 text-fg">项目 / 成果经历</h2>

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

          {/* 技能 / 工具标签输入 */}
          <div>
            <label className="block font-medium text-fg mb-1">关键技能 / 工具</label>
            <Controller
              control={control}
              name={`projects.${index}.techStack`}
              defaultValue={[]}
              render={({ field }) => {
                const tags: string[] = Array.isArray(field.value) ? field.value : [];

                const addTag = (value: string) => {
                  const trimmed = value.trim();
                  if (trimmed && !tags.includes(trimmed)) {
                    field.onChange([...tags, trimmed]);
                  }
                };

                const removeTag = (idx: number) => {
                  const newTags = [...tags];
                  newTags.splice(idx, 1);
                  field.onChange(newTags);
                };

                return (
                  <div className="flex flex-wrap items-center gap-2 border border-border rounded px-3 py-2 bg-surface">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center bg-highlight text-sm text-fg px-2 py-1 rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(idx)}
                          className="ml-1 text-fg hover:text-danger"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="输入后回车"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                      className="flex-1 min-w-[100px] border-none focus:outline-none bg-transparent text-fg placeholder:text-muted"
                    />
                  </div>
                );
              }}
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
