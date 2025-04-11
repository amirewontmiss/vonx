import { Suspense } from 'react'
import ChatWithSearchParams from '../../components/ChatWithSearchParams'

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading chat...</div>}>
      <ChatWithSearchParams />
    </Suspense>
  )
}

