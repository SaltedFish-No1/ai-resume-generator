// src/app/debug/form-test/page.tsx

"use client";

import { useForm } from "react-hook-form";
import { ResumeData } from "@/types/resume";
import { resumeSchema } from "@/lib/validators/resume";
import { zodResolver } from "@hookform/resolvers/zod";

// 组件导入
import { BasicInfoForm } from "@/components/profile/forms/BasicInfoForm";
import { EducationFormList } from "@/components/profile/forms/EducationFormList";
import { SkillsForm } from "@/components/profile/forms/SkillsForm";
import { ExperienceFormList } from "@/components/profile/forms/ExperienceFormList";
import { ProjectFormList } from "@/components/profile/forms/ProjectFormList";

export default function DebugPage() {
  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      fullName: "张三",
      email: "zhangsan@example.com",
      skills: [
        { name: "React", level: 8 },
        { name: "Tailwind", level: 7 },
      ],
      education: [
        {
          school: "北京大学",
          degree: "计算机科学学士",
          startDate: "2018-09-01",
          endDate: "2022-07-01",
          gpa: "3.8",
          description: "学习了软件工程、数据结构、算法等课程",
        },
      ],
      experience: [
        {
          company: "字节跳动",
          title: "前端实习生",
          startDate: "2022-07-01",
          endDate: "2023-03-01",
          description: "参与了多个项目的前端开发工作",
        },
      ],
      projects: [
        {
          name: "个人网站",
          techStack: ["Next.js", "Tailwind CSS"],
          description: "使用 Next.js 和 Tailwind CSS 构建的个人网站",
        },
      ],
    },
  });

  const onSubmit = (data: ResumeData) => {
    console.log("🧪 表单测试数据: ", data);
    alert("✅ 表单提交成功（查看控制台）");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold text-fg">🧪 表单调试页面</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfoForm form={form} />
        <SkillsForm form={form} />
        <EducationFormList form={form} />
        <ExperienceFormList form={form} />
        <ProjectFormList form={form} />


        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-hover"
        >
          提交测试
        </button>
      </form>
    </div>
  );
}
