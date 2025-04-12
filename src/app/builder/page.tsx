'use client'

import JobDescriptionForm from '@/components/builder/JobDescriptionForm'
import ResumePreview from '@/components/builder/ResumePreview'
import BuilderHeader from '@/components/builder/BuilerHeader'

export default function Page() {
  return (
    <>
      {/* 顶部导航 */}
      <BuilderHeader />

      {/* 内容主体：左侧表单 + 右侧预览 */}
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="w-full md:w-1/2">
          <JobDescriptionForm />
        </div>
        <div className="w-full md:w-1/2">
          <ResumePreview />
        </div>
      </div>
    </>
  )
}
