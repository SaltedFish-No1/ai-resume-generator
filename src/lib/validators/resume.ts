// lib/validators/resume.ts
import { z } from "zod";
const dateRegex = /^\d{4}-\d{2}-\d{2}$/

export const resumeSchema = z.object({
  // 1. 基本信息
  fullName: z.string().min(1, "姓名不能为空"),
  email: z.string().email("邮箱格式不正确"),
  phone: z
    .string()
    .regex(/^\+?[0-9\-\\s]{7,15}$/, "电话号码格式不正确")
    .optional(),
  jobTitle: z.string().optional(),
  summary: z.string().optional(),
  availability: z.string().optional(),
  locationPreference: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
        label: z.string(),                  // 显示名称，例如“GitHub”、“LinkedIn”
        url: z.string().url("链接格式错误") // URL 链接
      })
    )
    .optional(),

  // 2. 技能列表
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "技能名不能为空"),
        level: z.number().min(1).max(10),
      })
    )
    .optional(),

  // 3. 教育经历（必填至少一条）
  education: z
    .array(
      z.object({
        school: z.string(),
        degree: z.string(),
        startDate: z.string().regex(dateRegex, "日期格式为 MM/DD/YYYY"),
        endDate: z.string().regex(dateRegex, "日期格式为 MM/DD/YYYY"),
        gpa: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .min(1, "请至少填写一条教育经历"),

  // 4. 实习/工作经历
  experience: z
    .array(
      z.object({
        company: z.string(),
        title: z.string(),
        startDate: z.string().regex(dateRegex, "日期格式为 MM/DD/YYYY"),
        endDate: z.string().regex(dateRegex, "日期格式为 MM/DD/YYYY"),
        description: z.string(),
      })
    )
    .optional(),

  // 5. 项目经历
  projects: z
    .array(
      z.object({
        name: z.string(),
        techStack: z.array(z.string()),
        startDate: z.string().regex(dateRegex, "日期格式为 MM/DD/YYYY").optional(),
        endDate: z.string().regex(dateRegex, "日期格式为 MM/DD/YYYY").optional(),
        description: z.string(),
        link: z.string().url().optional(),
      })
    )
    .optional(),

  // 6. 其他字段
  publications: z
    .array(
      z.object({
        title: z.string(),
        journal: z.string().optional(),
        authors: z.string().optional(),
        date: z.string().optional(),
        link: z
          .union([
            z.string().url('链接格式错误'),
            z.literal('').transform(() => undefined)
          ])
          .optional(),
        summary: z.string().optional(),
      })
    )
    .optional(),

  awards: z
    .array(
      z.object({
        title: z.string().optional(),
        issuer: z.string().optional(),
        date: z.string().optional(),
      })
    )
    .optional(),

  certifications: z
    .array(
      z.object({
        name: z.string().optional(),
        issuer: z.string().optional(),
        date: z.string().optional(),
      })
    )
    .optional(),

  // 用户上传的简历文件
  resumePdfUrl: z.string().url().optional(),
});