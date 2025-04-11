'use client'

import { useState } from 'react'
import { optimizeResume } from '@/lib/ai/optimizeResume'
import resumes from './mockResume.json'
import { ResumeData } from '@/lib/validators/resume'

const resumeKeys = Object.keys(resumes) as (keyof typeof resumes)[]

export default function OptimizeTestPage() {
  const [type, setType] = useState<keyof typeof resumes>('dev')
  const [jd, setJd] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResumeData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleOptimize = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
  
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData: resumes[type],
          jobDescription: jd,
          jobTitle: resumes[type].jobTitle,
        }),
      })
  
      const json = await res.json()
      if (json.success) {
        setResult(json.data)
      } else {
        setError(json.error)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-[hsl(var(--fg))]">🧪 简历优化测试</h1>

      {/* 选择简历类型 */}
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label htmlFor="type" className="text-sm font-medium text-[hsl(var(--fg))]">
              当前简历：
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as keyof typeof resumes)}
              className="text-sm rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--highlight))] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            >
              {resumeKeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-muted-foreground">🎯 预设职位：{resumes[type]?.jobTitle || '无'}</div>
        </div>

        {/* JD 输入 */}
        <textarea
          className="w-full min-h-[180px] text-sm border border-[hsl(var(--border))] bg-[hsl(var(--highlight))] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
          placeholder="请输入职位描述 JD..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        <button
          onClick={handleOptimize}
          disabled={loading}
          className="w-full text-sm font-medium py-2 rounded-lg bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary-hover))] transition"
        >
          {loading ? '⏳ 正在优化...' : '✨ 调用 optimizeResume()'}
        </button>

        {error && (
          <div className="text-sm text-red-500 bg-red-100 px-3 py-2 rounded-md border border-red-200">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* 输出结果 */}
      {result && (
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4 text-sm shadow-sm">
          <div className="mb-2 font-semibold text-[hsl(var(--fg))]">✅ 优化结果</div>
          <pre className="overflow-auto max-h-[600px] text-[hsl(var(--fg))] bg-[hsl(var(--highlight))] p-4 rounded-md whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
