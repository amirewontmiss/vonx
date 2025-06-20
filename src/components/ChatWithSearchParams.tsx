'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { FaUser, FaRobot } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface Message {
  from: 'user' | 'bot'
  text: string
}

export default function ChatWithSearchParams() {
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get('prompt') || ''
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialPrompt) {
      setMessages([{ from: 'user', text: initialPrompt }])
      sendToAPI(initialPrompt)
    }
  }, [initialPrompt])

  const sendToAPI = async (text: string) => {
    setLoading(true)
    try {
      const res = await fetch('https://quantumgptmini-api.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { from: 'bot', text: data.response }])
    } catch {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Error contacting API.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const text = input.trim()
    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    sendToAPI(text)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="flex-1 overflow-y-auto rounded-lg px-4 py-2 bg-[#1e1e1e] max-w-5xl mx-auto w-full shadow-md">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex items-start mb-4 ${
              msg.from === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.from === 'bot' && (
              <div className="w-8 h-8 bg-neutral-800 text-white rounded-full flex items-center justify-center mr-2">
                <FaRobot className="text-xs" />
              </div>
            )}
            <div
              className={`px-4 py-3 rounded-lg max-w-xl text-sm ${
                msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-white'
              }`}
            >
              {msg.text}
            </div>
            {msg.from === 'user' && (
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-2">
                <FaUser className="text-xs" />
              </div>
            )}
          </motion.div>
        ))}
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 px-4 py-2"
          >
            VonX is thinking...
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2 max-w-5xl mx-auto w-full">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-zinc-900 text-white focus:outline-none"
        />
        <button type="submit" className="p-3 bg-blue-600 rounded-full hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12h15m0 0l-6.75 6.75M19.5 12l-6.75-6.75" />
          </svg>
        </button>
      </form>
    </div>
  )
}
