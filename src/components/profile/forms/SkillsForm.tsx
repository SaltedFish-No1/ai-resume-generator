"use client";

import { UseFormReturn, Controller } from "react-hook-form";
import { ResumeData } from "@/lib/validators/resume";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { SliderWithLabel } from "@/components/ui/SliderWithLable";


type Props = {
  form: UseFormReturn<ResumeData>;
};

type Skill = {
  name: string;
  level: number;
};

export function SkillsForm({ form }: Props) {
  const { control } = form;
  const [inputValue, setInputValue] = useState("");

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-fg">技能列表</h2>

      <Controller
        name="skills"
        control={control}
        defaultValue={[]} // ✅ 明确是 Skill[]
        render={({ field }) => {
          const value: Skill[] = field.value ?? [];
          const { onChange } = field;

          const addSkill = () => {
            const skillName = inputValue.trim();
            if (
              skillName.length > 0 &&
              !value.some((item) => item.name === skillName)
            ) {
              onChange([...value, { name: skillName, level: 5 }]);
              setInputValue("");
            }
          };

          const removeSkill = (index: number) => {
            const updated = [...value];
            updated.splice(index, 1);
            onChange(updated);
          };

          const updateLevel = (index: number, newLevel: number) => {
            const updated = [...value];
            updated[index].level = newLevel;
            onChange(updated);
          };

          return (
            <>
              {/* 添加输入框 */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  className="flex-1 bg-surface border border-border rounded px-3 py-2 text-fg"
                  placeholder="输入技能后点击添加"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-3 py-2 rounded bg-primary text-white hover:bg-primary-hover transition flex items-center gap-1"
                >
                  <Plus size={16} />
                  添加
                </button>
              </div>

              {/* 技能列表 */}
              {value.length > 0 && (
                <div className="space-y-4">
                  {value.map((item, index) => (
                    <div
                      key={index}
                      className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-fg font-medium">{item.name}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="text-muted hover:text-danger"
                          title="删除技能"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <SliderWithLabel
                        value={item.level}
                        onChange={(val) => updateLevel(index, val)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        }}
      />
    </section>
  );
}
