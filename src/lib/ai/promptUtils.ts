// src/lib/ai/promptUtils.ts

import { ResumeData } from "@/types/resume"



export const SYSTEM_PROMPT = `你是一个高级简历优化助手，请站在公司和专业面试官的角度，将用户简历中的指定字段结合岗位描述进行优化，使其更符合岗位要求。在优化过程中，必须遵循以下原则：

1. 严格保持原有事实，不允许捏造或扭曲信息；
2. 强化与岗位描述匹配的关键词、技能、项目经历；
3. 使用成就导向语言表达（STAR 法），尽可能量化成果；
4. 保持语法正确、表达专业、积极清晰；
5. 不返回Markdown 或多余解释；
`




/**
 * 生成用户级 prompt 对象，根据参数构造详细说明
 *
 * @param resume - 原始简历数据（JSON 格式）
 * @param jd - 岗位描述
 * @param jobTitle - 岗位名称（选填）
 * @param targetLanguage - 目标语言（选填），为空时默认使用原简历语言
 */
export function buildAllPrompt(
    resume: ResumeData,
    jd: string,
    jobTitle?: string,
    targetLanguage?: string) {
    return `
                    岗位名称：${jobTitle || "未知"}

                    岗位描述：
                    ${jd}

                    原始简历（JSON 格式）：
                    \`\`\`
                    ${JSON.stringify(resume, null, 2)}
                    \`\`\`

                    请基于下列要求优化该简历内容，确保调整后的简历更加突出与岗位描述匹配的优势，同时保持事实准确、结构不变：

                    1. 严格保持简历事实，不允许捏造或扭曲原有信息。
                    2. 使用 ${targetLanguage ?? "原简历语言"} 进行表述，确保语言表达准确、流畅。
                    3. 保持原始 JSON 的字段结构不变，不删除或重排序任何字段。
                    4. 提取岗位描述中的关键技能、经验和职责要求，突出与这些要求相符的项目经历和实际成果。
                    5. 优化职责和项目描述，采用成就导向的表达方式，尽可能量化成果（例如使用具体数字、百分比）。
                    6. 强调与岗位密切相关的专业技能、团队协作、跨部门沟通及问题解决能力等亮点。
                    7. 调整语言风格，使其更积极主动、专业且富有逻辑性，展现候选人的核心竞争力与创新能力。
                    8. 返回的结果必须为合法 JSON 格式，并严格遵守 ${targetLanguage ?? "原简历语言"} 的语法规范。

                    请根据以上要求优化简历内容，并返回优化后的合法 JSON 格式简历。
                    `
}

export function buildSummaryPrompt(
    resume: ResumeData,
    jd: string,
    jobTitle?: string,
    targetLanguage?: string
) {
    const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        {
            role: "user", content: `你是一位经验丰富的简历优化专家，擅长根据岗位需求提炼候选人的亮点，并撰写精准有力的简历摘要（Summary）。
            
            请根据以下信息，为候选人生成一段高质量的个人简介（summary 字段），用于投递“${jobTitle || "未知岗位"}”。
            
            要求如下：
            1. 使用 ${targetLanguage || "原简历语言"} 进行撰写。
            2. 不得添加虚构信息，必须基于候选人真实经历。
            3. 风格需简洁、专业、积极主动，突出与岗位的匹配度。
            4. 推荐使用“成就导向”写法，聚焦能力、经验、关键成果。
            5. 返回的内容必须是一段纯文本 summary 字符串，无需 JSON 包装。
            
            📌 岗位信息：
            ${jd}
            
            📌 候选人简历（JSON 格式）：
            \`\`\`json
            ${JSON.stringify(resume, null, 2)}
            \`\`\`
            
            请生成并返回一段针对该岗位优化后的 summary。
                `.trim()
        },
    ]


}

export function buildExperiencePrompt() {

}
