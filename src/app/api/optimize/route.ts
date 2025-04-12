// src/app/api/optimize/route.ts
import { optimizeResume } from "@/lib/ai/optimizeResume"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { resumeData, jobDescription, jobTitle, targetLanguage, model } = body

  try {
    const optimized = await optimizeResume({
      resumeData,
      jobDescription,
      jobTitle,
      targetLanguage,
      model,
    })

    return NextResponse.json({ success: true, data: optimized })
  } catch (err) {
    console.error("优化失败:", err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
