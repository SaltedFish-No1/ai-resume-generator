// src/components/builder/ResumePreview.tsx
'use client'
import { useUser } from '@/lib/context/auth'
import { useToast } from '@/lib/context/ToastProvider'
import { useResumeBuilder } from '@/lib/context/builder/ResumeBuilderContext'

import BasicInfo from './preview/BasicInfo'
import Section from './preview/Section'
import EducationList from './preview/EducationList'
import ExperienceList from './preview/ExperienceList'
import ProjectList from './preview/ProjectList'
import SkillsList from './preview/SkillsList'
import OtherInfoList from './preview/OtherInfoList'

import { ResumeData } from '@/types/resume'

interface ResumePreviewProps {
  onLoaded?: (data: ResumeData) => void
  updatedProfile?: ResumeData
  isPrintView?: boolean
}

export default function ResumePreview({
  onLoaded,
  updatedProfile,
  isPrintView = false,
}: ResumePreviewProps) {
  const { user } = useUser()
  const { showToast } = useToast()

  const {
    setBasicInfo,
    setEducation,
    setExperience,
    setProjects,
    setSkills,
    setOtherInfo,
    setGlobalLoading,
    basicInfo,
    education,
    experience,
    projects,
    skills,
    otherInfo,
    globalLoading,

  } = useResumeBuilder()




  if (globalLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  if (!basicInfo) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        暂无简历数据
      </div>
    )
  }

  return (
    <div
      className={`max-w-3xl mx-auto ${isPrintView ? 'p-0' : 'p-6'} text-[hsl(var(--fg))]`}
    >
      <BasicInfo data={basicInfo} isPrintView={isPrintView} />
      <div className={isPrintView ? '' : 'divide-y divide-[hsl(var(--border))]'}>
        <Section title="教育经历" isPrintView={isPrintView}>
          <EducationList data={education} />
        </Section>

        {experience.length > 0 && (
          <Section title="工作经历" optional isPrintView={isPrintView}>
            <ExperienceList data={experience} />
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="项目经历" optional isPrintView={isPrintView}>
            <ProjectList data={projects} isPrintView={isPrintView} />
          </Section>
        )}

        <Section title="技能" isPrintView={isPrintView}>
          <SkillsList data={skills} isPrintView={isPrintView} />
        </Section>

        {(otherInfo.publications?.length ||
          otherInfo.awards?.length ||
          otherInfo.certifications?.length) && (
            <OtherInfoList data={otherInfo} isPrintView={isPrintView} />
          )}
      </div>
    </div>
  )
}
