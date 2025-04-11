// src/app/profile/account/page.tsx
'use client'

import { useUser } from '@/lib/context/auth'
import { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { Button, ResponsiveButtonRow } from '@/components/ui/Button'

export default function AccountProfilePage() {
  const { user } = useUser()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    if (!auth.currentUser) return
    setLoading(true)
    setMessage('')
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL })
      setMessage('✅ 资料已更新')
    } catch (err) {
      console.error(err)
      setMessage('❌ 更新失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">账户资料设置</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">昵称</label>
          <input
            className="w-full p-2 border rounded bg-bg text-fg"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="请输入昵称"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">头像链接</label>
          <input
            className="w-full p-2 border rounded bg-bg text-fg"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="https://example.com/avatar.png"
          />
        </div>

        <ResponsiveButtonRow>
          <Button
            variant="primary"
            className="ml-auto sm:w-auto mt-4"
            onClick={handleSave}
            disabled={loading}
          >
            保存修改
          </Button>
        </ResponsiveButtonRow>



        {/* 提示信息 */}
        {message && <p className="text-sm text-muted-foreground mt-2">{message}</p>}
      </div>
    </div>
  )
}
