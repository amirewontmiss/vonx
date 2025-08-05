// src/app/sandbox/page.tsx
'use client'

export default function SandboxPage() {
  return (
    <div className="flex flex-col h-screen bg-black text-white items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 text-lg">Coming Soon</p>
      </div>
      
      {/* HIDDEN CONTENT - PRESERVED FOR FUTURE USE
      <div className="flex flex-col p-4">
        <h1 className="text-3xl font-extrabold text-white mb-4">QNN Playground</h1>
        <QNNPlayground />
      </div>
      */}
    </div>
  )
}

