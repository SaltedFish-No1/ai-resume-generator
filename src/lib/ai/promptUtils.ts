// src/lib/ai/promptUtils.ts

import { ResumeData } from "@/lib/validators/resume"

/**
 * 生成用户级 prompt 对象，根据参数构造详细说明
 *
 * @param resume - 原始简历数据（JSON 格式）
 * @param jd - 岗位描述
 * @param jobTitle - 岗位名称（选填）
 * @param targetLanguage - 目标语言（选填），为空时默认使用原简历语言
 */
export function buildUserPrompt(resume: ResumeData, jd: string, jobTitle?: string, targetLanguage?: string) {
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
    `;
}
