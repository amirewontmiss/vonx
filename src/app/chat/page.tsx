import { Suspense } from 'react'
import Sidebar from '../../components/Sidebar'
import ChatWithSearchParams from '../../components/ChatWithSearchParams'

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <Suspense fallback={<div className="text-white p-6">Loading chat...</div>}>
        <ChatWithSearchParams />
      </Suspense>
    </div>
  )
}

