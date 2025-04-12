// src/lib/ai/optimizeResume.ts
import OpenAi from "openai"
import { ResumeData } from "@/types/resume"
import { buildAllPrompt, SYSTEM_PROMPT } from "@/lib/ai/promptUtils"


interface OptimizeResumeProps {
    resumeData: ResumeData;
    jobDescription: string;
    jobTitle?: string;
    targetLanguage?: string;
    model?: string;
}

const deepseek = new OpenAi({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY!,
})
/**
 * 
 * @param resumeData - 原始简历数据
 * @param jobTitle - 岗位名称（可选）
 * @param jobDescription - 岗位描述
 * @param targetLanguage - 目标语言（可选），默认为中文
 * @param model - 模型名称（可选）
 * @returns - 优化后的简历数据
 * @throws - 如果解析 JSON 失败或 LLM 没有响应，则抛出错误
 */
export async function optimizeResume({
    resumeData,
    jobTitle,
    jobDescription,
    targetLanguage = "中文",
    model = "deepseek-chat"
}: OptimizeResumeProps): Promise<ResumeData> {
    // const prompt = `Optimize the following resume data for the job description provided. Make sure to highlight relevant skills and experiences that match the job description.`
    const userPrompt = buildAllPrompt(resumeData, jobDescription, jobTitle, targetLanguage)

    const completion = await deepseek.chat.completions.create({
        model: model,
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
        ],
        max_tokens: 1000, // max tokens for the response
        temperature: 0.4,
    })

    const output = completion.choices[0].message.content
    if (!output) {
        throw new Error("LLM no response")
    }
    let parsed: ResumeData
    try {
        // 清除 ```json ``` 包裹
        const cleaned = output
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim()

        parsed = JSON.parse(cleaned)
    } catch (error) {
        console.error("Error parsing JSON response:", output)
        throw new Error("Failed to parse LLM response")
    }
    return parsed as ResumeData;
}
