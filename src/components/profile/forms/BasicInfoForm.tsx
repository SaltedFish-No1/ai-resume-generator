// src/components/profile/forms/BasicInfoForm.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import { ResumeData } from "@/lib/validators/resume";
import { setValueAsUrl, sanitizeString } from "@/lib/utils/formUtils";
import { set } from "zod";

type Props = {
  form: UseFormReturn<ResumeData>;
};

export function BasicInfoForm({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-fg">基本信息</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 姓名 */}
        <div>
          <label className="block font-medium mb-1 text-fg">姓名 *</label>
          <input
            type="text"
            {...register("fullName")}
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
            {...register("email")}
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
            {...register("phone")}
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
            {...register("jobTitle")}
            className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block font-medium mb-1 text-fg">GitHub</label>
          <input
            type="url"
            {...register("github", 
              {setValueAs: setValueAsUrl}
            )}
            className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
            placeholder="https://github.com/yourname"
          />
          {errors.github && (
            <p className="text-danger text-sm mt-1">{errors.github.message}</p>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block font-medium mb-1 text-fg">LinkedIn</label>
          <input
            type="url"
            {...register("linkedin", {setValueAs: setValueAsUrl})}
            className="w-full bg-surface text-fg border border-border rounded px-3 py-2"
            placeholder="https://linkedin.com/in/yourname"
          />
          {errors.linkedin && (
            <p className="text-danger text-sm mt-1">{errors.linkedin.message}</p>
          )}
        </div>
      </div>

      {/* 简介 */}
      <div className="mt-4">
        <label className="block font-medium mb-1 text-fg">个人简介</label>
        <textarea
          {...register("summary", {setValueAs: sanitizeString})}
          className="w-full bg-surface text-fg border border-border rounded px-3 py-2 min-h-[100px]"
        />
      </div>
    </section>
  );
}
