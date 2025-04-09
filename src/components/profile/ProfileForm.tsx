// components/profile/ProfileForm.tsx

export default function ProfileForm() {
    return (
      <form className="space-y-6">
        {/* 占位字段 */}
        <div>
          <label className="block text-sm font-medium text-muted mb-1">姓名 / Name</label>
          <input
            type="text"
            placeholder="张三 / John Doe"
            className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-muted mb-1">职业 / Title</label>
          <input
            type="text"
            placeholder="前端开发工程师 / Frontend Developer"
            className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-muted mb-1">个人简介 / Summary</label>
          <textarea
            rows={4}
            placeholder="请输入你的自我介绍、经验亮点等"
            className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
  
        <button
          type="submit"
          className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition"
        >
          保存
        </button>
      </form>
    )
  }
  