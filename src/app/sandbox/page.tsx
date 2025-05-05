// src/app/sandbox/page.tsx
'use client'

import dynamic from 'next/dynamic'

const QNNPlayground = dynamic(() => import('../../components/QNNPlayground'), { ssr: false })

export default function SandboxPage() {
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-extrabold text-white mb-4">🧪 QNN Playground</h1>
      <QNNPlayground />
    </div>
  )
}

