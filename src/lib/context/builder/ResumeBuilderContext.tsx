'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import {
  ResumeData,
  BasicInfoData,
  EducationData,
  ExperienceData,
  ProjectData,
  SkillsData,
  OtherInfoData,
} from '@/types/resume'
import { useUser } from '@/lib/context/auth'
import {
  extractBasicInfo,
  extractEducation,
  extractExperience,
  extractProjects,
  extractSkills,
  extractOtherInfo,
} from '@/lib/utils/resumeUtils'
import { db } from '@/lib/firebase/client'
import { doc, getDoc } from 'firebase/firestore'
import { useToast } from '@/lib/context/ToastProvider'
import { set } from 'date-fns'
import { callOptimizeAPI } from '@/app/api/optimize/optimizeClient'

type Language = '中文' | 'English'

interface ResumeBuilderContextValue {
  // ====== 职位输入 ======
  jobTitle: string
  setJobTitle: (val: string) => void
  jobDesc: string
  setJobDesc: (val: string) => void
  targetLanguage: Language
  setTargetLanguage: (lang: Language) => void

  // ====== Loading state ======
  globalLoading: boolean
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>

  // ====== 简历结构 ======
  basicInfo: BasicInfoData | null
  setBasicInfo: React.Dispatch<React.SetStateAction<BasicInfoData | null>>
  education: EducationData
  setEducation: React.Dispatch<React.SetStateAction<EducationData>>
  experience: ExperienceData
  setExperience: React.Dispatch<React.SetStateAction<ExperienceData>>
  projects: ProjectData
  setProjects: React.Dispatch<React.SetStateAction<ProjectData>>
  skills: SkillsData
  setSkills: React.Dispatch<React.SetStateAction<SkillsData>>
  otherInfo: OtherInfoData
  setOtherInfo: React.Dispatch<React.SetStateAction<OtherInfoData>>

  // ====== 原始数据 ======
  originalResume?: ResumeData
  setOriginalResume?: (data: ResumeData) => void

  // ====== 对比/匹配度 ======
  isComparing: boolean
  matchScore: number | null

  // ====== 对外暴露的动作 ======
  handleOptimize: () => void
  handleSave: () => void
  handleDownload: () => void
  handleShare: () => void
  handleClear: () => void
  handleHistory: () => void
  handleToggleCompare: () => void
}

const ResumeBuilderContext = createContext<ResumeBuilderContextValue | null>(null)

export const useResumeBuilder = () => {
  const context = useContext(ResumeBuilderContext)
  if (!context) {
    throw new Error('useResumeBuilder 必须在 ResumeBuilderProvider 中使用')
  }
  return context
}

export function ResumeBuilderProvider({ children }: { children: ReactNode }) {
  // ====== 职位输入 ======
  const [jobTitle, setJobTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [targetLanguage, setTargetLanguage] = useState<Language>('中文')

  // ====== 简历结构 ======
  const [basicInfo, setBasicInfo] = useState<BasicInfoData | null>(null)
  const [education, setEducation] = useState<EducationData>([])
  const [experience, setExperience] = useState<ExperienceData>([])
  const [projects, setProjects] = useState<ProjectData>([])
  const [skills, setSkills] = useState<SkillsData>([])
  const [otherInfo, setOtherInfo] = useState<OtherInfoData>({})

  // ====== 原始数据（需要的话可以在保存 / 对比时用到） ======
  const [originalResume, setOriginalResume] = useState<ResumeData | undefined>()

  // ====== 对比 & 匹配度 ======
  const [isComparing, setIsComparing] = useState(false)
  const [matchScore, setMatchScore] = useState<number | null>(null)

  // ====== 对外暴露的动作（demo 中只是 console 或简单提示） ======
  const handleOptimize = () => {
    // 这里执行优化逻辑（调用 API、处理数据等）
    // 临时方案： 直接调用 resumeData 作为optimizedResume的输入，将来会改为调用拆分后的数据
    setGlobalLoading(true)
    const optimizedResume = callOptimizeAPI({
      resumeData: originalResume!,
      jobTitle,
      jobDescription: jobDesc,
      targetLanguage,
    })
    optimizedResume.then((data) => {
      // 将优化后的数据设置到简历结构中
      setBasicInfo(extractBasicInfo(data))
      setEducation(extractEducation(data))
      setExperience(extractExperience(data))
      setProjects(extractProjects(data))
      setSkills(extractSkills(data))
      setOtherInfo(extractOtherInfo(data))
    })
    .catch((err) => {
      console.error('❌ 优化失败:', err)
      showToast({
        type: 'error',
        title: '优化失败',
        description: '无法优化简历，请稍后重试。',
      })
    })
    .finally(() => {
      setGlobalLoading(false)
    })
    console.log('触发优化操作')
  }

  const handleSave = () => {
    console.log('触发保存操作')
    // 这里执行保存逻辑（上传到 DB、保存到本地等）
  }

  const handleDownload = () => {
    console.log('触发下载操作')
    // 这里执行下载 PDF 的逻辑
  }

  const handleShare = () => {
    console.log('触发分享操作')
    // 这里执行生成分享链接等操作
  }

  const handleClear = () => {
    console.log('触发清空操作')
    // 这里执行清空逻辑
    setJobTitle('')
    setJobDesc('')
    setBasicInfo(null)
    setEducation([])
    setExperience([])
    setProjects([])
    setSkills([])
    setOtherInfo({})
    setOriginalResume(undefined)
  }

  const handleHistory = () => {
    console.log('触发查看历史记录操作')
    // 这里可以弹出历史版本选择或跳转到某个路由等
  }

  const handleToggleCompare = () => {
    setIsComparing((prev) => !prev)
  }


  const { user } = useUser()
  const { showToast } = useToast()
  const [globalLoading, setGlobalLoading] = useState(false)

  // 加载原始数据
  useEffect(() => {
    async function loadResumeData() {
      if (!user?.uid) return;
      try {
        setGlobalLoading(true)
        const ref = doc(db, 'users', user.uid, 'profile', 'base')
        const snapshot = await getDoc(ref)
        if (snapshot.exists()) {
          const data = snapshot.data() as ResumeData
          // 将数据依次分解后放入 Context
          setBasicInfo(extractBasicInfo(data))
          setEducation(extractEducation(data))
          setExperience(extractExperience(data))
          setProjects(extractProjects(data))
          setSkills(extractSkills(data))
          setOtherInfo(extractOtherInfo(data))
          // 如果你还需要存储原始数据
          setOriginalResume(data)
          setGlobalLoading(false)
        }
      } catch (err) {
        console.error('❌ 简历加载失败:', err)
        showToast({
          type: 'error',
          title: '加载失败',
          description: '无法加载简历数据，请稍后重试。',
        })
      }
    }
    loadResumeData();
  }, [user?.uid])




  return (
    <ResumeBuilderContext.Provider
      value={{
        globalLoading,
        setGlobalLoading,

        jobTitle,
        setJobTitle,
        jobDesc,
        setJobDesc,
        targetLanguage,
        setTargetLanguage,

        basicInfo,
        setBasicInfo,
        education,
        setEducation,
        experience,
        setExperience,
        projects,
        setProjects,
        skills,
        setSkills,
        otherInfo,
        setOtherInfo,

        originalResume,
        setOriginalResume,

        isComparing,
        matchScore,

        handleOptimize,
        handleSave,
        handleDownload,
        handleShare,
        handleClear,
        handleHistory,
        handleToggleCompare,
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  )
}
