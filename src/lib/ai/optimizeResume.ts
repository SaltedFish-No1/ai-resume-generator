// src/lib/ai/optimizeResume.ts
import OpenAi from "openai"
import { ResumeData } from "@/lib/validators/resume"
import { buildUserPrompt } from "@/lib/ai/promptUtils"


interface OptimizeResumeProps {
    resumeData: ResumeData;
    jobDescription: string;
    jobTitle?: string;
    targetLanguage?: string;
    model?: string;
}

const deepseek = new OpenAi({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
})

export async function optimizeResume({
    resumeData,
    jobDescription,
    jobTitle,
    targetLanguage,
    model = "deepseek-chat"
}: OptimizeResumeProps): Promise<ResumeData> {
    // const prompt = `Optimize the following resume data for the job description provided. Make sure to highlight relevant skills and experiences that match the job description.`
    const prompt = buildUserPrompt(resumeData, jobDescription, jobTitle, targetLanguage)

    const completion = await deepseek.chat.completions.create({
        model: model,
        messages: [
            {
                role: "system",
                content: "你是一个高级简历优化助手，请站在公司和专业面试官的角度，将用户原始简历结合岗位描述进行优化，使其更符合岗位要求。在优化过程中，要求严格保持原有事实，不允许捏造或扭曲信息，增强成就导向表达，突出与岗位匹配的技能和项目经验，同时确保输出为合法的 JSON 格式，字段结构保持不变。",
            },
            {
                role: "user",
                content: prompt,
            },

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
    return parsed;
}
