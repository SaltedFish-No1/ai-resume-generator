'use client'

import { useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ResumeData } from '@/types/resume'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase/client'
import { Button } from '@/components/ui/Button'
import { useUser } from '@/lib/context/auth'

export function ResumeUpload({ form }: { form: UseFormReturn<ResumeData> }) {
  const { setValue, watch } = form
  const resumePdfUrl = watch('resumePdfUrl')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const { user } = useUser()

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('文件不能超过 2MB')
      return
    }

    setUploading(true)
    setUploadError(null)

    try {
      const uid = user?.uid || 'anonymous'
      const fileName = file.name.replace(/\s+/g, '_') // 替换空格为下划线
      const fileRef = ref(storage, `resumes/${uid}/${file.name}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      setValue('resumePdfUrl', url)
    } catch (err) {
      console.error('❌ 上传失败:', err)
      setUploadError('上传失败，请稍后重试')
    } finally {
      setUploading(false)
    }
  }

  const handleParse = () => {
    if (!resumePdfUrl) return
    console.log('🚀 准备解析 PDF：', resumePdfUrl)
    alert('解析功能尚未接入，但已成功触发逻辑！')
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-fg">上传简历（PDF）</h2>

      {/* ✅ 用 ref 触发隐藏 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />

      <Button
        type="button"
        variant="secondary"
        onClick={handleUploadClick}
        isLoading={uploading}
      >
        {uploading ? '上传中...' : '上传 PDF 简历'}
      </Button>

      {uploadError && (
        <p className="text-sm text-danger">{uploadError}</p>
      )}

      {resumePdfUrl && (
        <div className="flex items-center gap-4 mt-2">
          <a
            href={resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline text-sm"
          >
            查看上传文件
          </a>

          <Button
            type="button"
            variant="secondary"
            onClick={handleParse}
          >
            解析简历
          </Button>
        </div>
      )}
    </section>
  )
}
