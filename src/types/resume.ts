import { resumeSchema } from '@/lib/validators/resume'
import { z } from 'zod'

// 完整的简历类型
export type ResumeData = z.infer<typeof resumeSchema>

// 👇 1. 基本信息（预览、表头展示）
export type BasicInfoData = Pick<
  ResumeData,
  'fullName' | 'email' | 'phone' | 'jobTitle' | 'summary' | 'availability' | 'locationPreference' | 'socialLinks'
>

// 👇 2. 技能项
export type SkillItem = {
  name: string
  level: number // 1 ~ 10
}
export type SkillsData = SkillItem[]

// 👇 3. 教育经历
export type EducationItem = {
  school: string
  degree: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
}
export type EducationData = EducationItem[]

// 👇 4. 工作 / 实习经历
export type ExperienceItem = {
  company: string
  title: string
  startDate: string
  endDate: string
  description: string
}
export type ExperienceData = ExperienceItem[]

// 👇 5. 项目经历
export type ProjectItem = {
  name: string
  techStack: string[]
  startDate?: string
  endDate?: string
  description: string
  link?: string
}
export type ProjectData = ProjectItem[]

// 👇 6. 学术出版物
export type PublicationItem = {
  title: string
  journal?: string
  authors?: string
  date?: string
  link?: string
  summary?: string
}
export type PublicationData = PublicationItem[]

// 👇 7. 奖项
export type AwardItem = {
  title?: string
  issuer?: string
  date?: string
}
export type AwardsData = AwardItem[]

// 👇 8. 认证证书
export type CertificationItem = {
  name?: string
  issuer?: string
  date?: string
}
export type CertificationData = CertificationItem[]

// 👇 9. 社交链接
export type SocialLink = {
  label: string
  url: string
}
export type SocialLinksData = SocialLink[]

// 👇 10. 简历文件（单字段）
export type ResumeFileData = string | undefined
