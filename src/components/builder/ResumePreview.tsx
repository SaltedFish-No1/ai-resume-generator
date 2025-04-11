// components/builder/ResumePreview.tsx
'use client'

import { useUser } from '@/lib/context/auth'
import { db } from '@/lib/firebase/client'
import { getDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { ResumeData } from '@/lib/validators/resume'
import BasicInfo from '@/components/builder/preview/BasicInfo'
import Section from '@/components/builder/preview/Section'
import EducationList from '@/components/builder/preview/EducationList'
import ExperienceList from '@/components/builder/preview/ExperienceList'
import ProjectList from '@/components/builder/preview/ProjectList'
import SkillsList from '@/components/builder/preview/SkillsList'

async function getUserProfile(uid: string): Promise<ResumeData | null> {
  const docRef = doc(db, 'users', uid, 'profile', 'base')
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? (docSnap.data() as ResumeData) : null
}

export default function ResumePreview() {
  const { user } = useUser()
  const [profile, setProfile] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) return
    getUserProfile(user.uid).then((data) => {
      setProfile(data)
      setLoading(false)
    })
  }, [user?.uid])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    )

  if (!profile)
    return (
      <div className="text-center py-10 text-muted-foreground">
        No profile found
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg bg-[hsl(var(--surface))] text-[hsl(var(--fg))]">
      <BasicInfo data={profile} />
      <div className="divide-y divide-[hsl(var(--border))]">
        <Section title="教育经历">
          <EducationList data={profile.education} />
        </Section>

        {profile.experience?.length !== 0 && (
          <Section title="工作经历" optional>
            <ExperienceList data={profile.experience} />
          </Section>
        )}

        {profile.projects?.length !== 0 && (
          <Section title="项目经历" optional>
            <ProjectList data={profile.projects} />
          </Section>
        )}
        <Section title="技能">
          <SkillsList data={profile.skills} />
        </Section>
      </div>
    </div>
  )
}