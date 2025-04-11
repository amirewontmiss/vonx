'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [input, setInput] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return
    router.push(`/chat?prompt=${encodeURIComponent(input)}`)
  }

  return (
    <div className="flex flex-col items-center justify-center text-white px-4 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-white mb-2">Quantum GPT-mini 🚀</h1>
        <p className="text-gray-400 text-lg">
          World's first ever experimental Quantum Transformer AI
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="flex items-center bg-[#1e1e1e] rounded-2xl px-4 py-3 w-full">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent text-white w-full focus:outline-none text-lg"
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-400 hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 12h16m0 0l-6.5 6.5M20 12l-6.5-6.5"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

