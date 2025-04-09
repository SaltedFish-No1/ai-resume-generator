// src/components/profile/UploadResumeSection.tsx

"use client"

import { useRef } from "react"
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline"

export default function UploadResumeSection() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("用户上传了文件：", file.name)
      // TODO: 解析 PDF 内容，提取字段并回填表单
    }
  }

  return (
    <div className="border border-dashed border-border bg-surface rounded-xl p-6 flex flex-col items-center text-center space-y-2">
      <DocumentArrowUpIcon className="w-10 h-10 text-muted" />
      <p className="text-sm text-muted">已有简历？上传 PDF，系统将自动提取信息</p>
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-medium transition"
      >
        上传 PDF 简历
      </button>
      <input
        type="file"
        accept=".pdf"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
