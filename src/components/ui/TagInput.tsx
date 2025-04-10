import { Controller } from "react-hook-form";
import { X } from "lucide-react";

export function TagInput({ control, name }: { control: any; name: string }) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field }) => {
        const tags: string[] = Array.isArray(field.value) ? field.value : [];

        const addTag = (value: string) => {
          const trimmed = value.trim();
          if (trimmed && !tags.includes(trimmed)) {
            field.onChange([...tags, trimmed]);
          }
        };

        const removeTag = (index: number) => {
          const newTags = [...tags];
          newTags.splice(index, 1);
          field.onChange(newTags);
        };

        return (
          <div>
            <label className="block font-medium text-fg mb-1">
              关键技能 / 工具
            </label>

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

              {/* 输入框 */}
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
          </div>
        );
      }}
    />
  );
}
