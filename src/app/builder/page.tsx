'use client'


import JobDescriptionForm from "@/components/builder/JobDescriptionForm"
import ResumePreview from "@/components/builder/ResumePreview"
import BuilderHeader from "@/components/builder/BuilerHeader"

export default function Page() {
  return (
    <>
      {/* 顶部导航栏 */}
      <BuilderHeader
        onSave={() => {}}
        onOptimize={() => {}}
        onDownload={() => {}}
        onShare={() => {}}
        onClear={() => {}}
        onHistory={() => {}}
        onCompare={() => {}}
        showCompare={false}
        matchScore={null}
      />
      

      {/* 内容主体 */}
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* 左侧输入表单 */}
        <div className="w-full md:w-1/2">
          <JobDescriptionForm />
        </div>

        {/* 右侧实时预览 */}
        <div className="w-full md:w-1/2">
          <ResumePreview />
        </div>
      </div>
    </>
  )
}
