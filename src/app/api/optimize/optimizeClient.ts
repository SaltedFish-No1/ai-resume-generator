// lib/api/optimizeClient.ts
import { ResumeData } from '@/types/resume'

export async function callOptimizeAPI({
    resumeData,
    jobDescription,
    jobTitle,
    targetLanguage = '中文',
    model = 'deepseek-chat',
}: {
    resumeData: ResumeData
    jobDescription: string
    jobTitle?: string
    targetLanguage?: string
    model?: string
}) {
    const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            resumeData,
            jobDescription,
            jobTitle,
            targetLanguage,
            model,
        }),
    })

    const json = await res.json()

    if (!res.ok || !json.success) {
        throw new Error(json.error || '优化失败')
    }

    return json.data as ResumeData
}
