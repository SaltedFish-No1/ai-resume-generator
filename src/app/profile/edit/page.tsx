// src/app/profile/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/lib/firebase/client';
import { ResumeData, resumeSchema } from '@/lib/validators/resume';
import { useUser } from '@/lib/context/auth';
import { removeUndefined, stripErrorRefs } from '@/lib/utils/formUtils';

import { BasicInfoForm } from '@/components/profile/forms/BasicInfoForm';
import { EducationFormList } from '@/components/profile/forms/EducationFormList';
import { SkillsForm } from '@/components/profile/forms/SkillsForm';
import { ExperienceFormList } from '@/components/profile/forms/ExperienceFormList';
import { ProjectFormList } from '@/components/profile/forms/ProjectFormList';
import { Button } from '@/components/ui/Button';
import { ProfileEditSkeleton } from '@/components/profile/forms/skeletons/ProfileEditSkeleton';
import { ResumeUpload } from '@/components/profile/forms/ResumeUpload';


export default function ProfileEditPage() {
  const { user, loading: authLoading } = useUser();

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      fullName: '',
      email: '',
      skills: [],
      education: [],
      experience: [],
      projects: [],
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 👇 等待用户状态加载完成后，加载简历数据
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setError('未登录，无法加载简历数据');
      setLoading(false);
      return;
    }

    const loadProfileData = async () => {
      try {
        const ref = doc(db, 'users', user.uid, 'profile', 'base');
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          const data = snapshot.data() as ResumeData;
          console.log('📥 已加载数据:', data);
          reset(data);
        }
      } catch (err) {
        console.error('❌ 加载失败:', err);
        setError('加载失败，请查看控制台');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [authLoading, user, reset]);

  const saveProfileData = async (data: ResumeData) => {
    if (!user) {
      alert('⚠️ 请先登录');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const ref = doc(db, 'users', user.uid, 'profile', 'base');
      const cleanedData = removeUndefined(data);

      console.group('🚀 正在保存数据');
      console.table(cleanedData);
      console.groupEnd();

      await setDoc(
        ref,
        { ...cleanedData, updatedAt: serverTimestamp() },
        { merge: true }
      );

      setSuccess(true);
    } catch (err) {
      console.error('❌ 保存失败:', err);
      setError('保存失败，请查看控制台日志');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return <ProfileEditSkeleton />;
  }

  if (!user) {
    return (
      <main className="max-w-4xl mx-auto p-6 text-danger text-center">
        ❌ 请先登录后再访问此页面
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-fg">编辑你的简历信息</h1>

      <form onSubmit={handleSubmit(saveProfileData)} className="space-y-10">


        {/* 👇 插入 PDF 上传模块 */}
        <ResumeUpload form={form} />
        <BasicInfoForm form={form} />
        <SkillsForm form={form} />
        <EducationFormList form={form} />
        <ExperienceFormList form={form} />
        <ProjectFormList form={form} />

        {success && (
          <p className="text-green-600 font-medium">✅ 保存成功</p>
        )}
        {error && (
          <pre className="bg-red-100 text-red-600 p-4 rounded border border-red-300 whitespace-pre-wrap">
            ❌ {error}
          </pre>
        )}
        {Object.keys(errors).length > 0 && (
          <details className="bg-yellow-100 text-yellow-800 p-4 rounded border border-yellow-300 whitespace-pre-wrap">
            <summary className="cursor-pointer font-medium">
              ⚠️ 表单校验错误（点击展开）
            </summary>
            <pre>
              {JSON.stringify(stripErrorRefs(errors), null, 2)}
            </pre>
          </details>
        )}


        <Button
          type="submit"
          variant="primary"
          isLoading={saving}
          loadingText="保存中..."
          className="w-full md:w-auto"
        >
          保存
        </Button>
      </form>
    </main>
  );
}
