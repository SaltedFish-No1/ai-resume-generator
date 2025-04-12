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
    return parsed;
}
