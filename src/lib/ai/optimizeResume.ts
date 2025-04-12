import OpenAI from 'openai'
import { ResumeData } from '@/types/resume'
import { buildAllPrompt, SYSTEM_PROMPT } from '@/lib/ai/promptUtils'

interface OptimizeResumeProps {
  resumeData: ResumeData
  jobDescription: string
  jobTitle?: string
  targetLanguage?: string
  model?: string
}

const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY!,
})

export async function optimizeResume({
  resumeData,
  jobTitle,
  jobDescription,
  targetLanguage = '中文',
  model = 'deepseek-chat',
}: OptimizeResumeProps): Promise<ResumeData> {
  const userPrompt = buildAllPrompt(resumeData, jobDescription, jobTitle, targetLanguage)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 60_000) // ⏱ 60 秒超时保护

  let output: string | null = null

  try {
    const completion = await deepseek.chat.completions.create(
      {
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 1000,
        temperature: 0.4,
      },
      {
        signal: controller.signal,
      }
    )

    clearTimeout(timeout)

    output = completion.choices[0].message.content?.trim() || ''

    if (!output) {
      throw new Error('模型无返回内容')
    }

    // 处理 JSON 包裹 ```json ... ```
    const cleaned = output
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const parsed = JSON.parse(cleaned)

    return parsed as ResumeData
  } catch (err: any) {
    clearTimeout(timeout)

    console.error('🔴 优化简历失败:', err)
    if (err.name === 'AbortError') {
      throw new Error('AI 响应超时，请稍后重试')
    }

    // 抛出可追踪错误（带原始输出）
    throw new Error(
      `优化失败：${err.message || '未知错误'}\n---原始返回内容---\n${output || '无内容'}`
    )
  }
}
