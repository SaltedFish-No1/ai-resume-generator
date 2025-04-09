import ProfileForm from "@/components/profile/ProfileForm"
import UploadResumeSection from "@/components/profile/UploadResumeSection"

export default function ProfileEditPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-12 lg:px-24 bg-bg text-fg">
      <div className="max-w-3xl mx-auto space-y-8">
        <section>
          <h1 className="text-2xl font-semibold text-primary">编辑个人资料</h1>
          <p className="text-sm text-muted">
            请完善你的基本信息，系统将基于此为你生成个性化简历。
          </p>
        </section>

        {/* ① 上传 PDF 简历模块 */}
        <UploadResumeSection />

        {/* ② 表单区 */}
        <ProfileForm />
      </div>
    </main>
  )
}
