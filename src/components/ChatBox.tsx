'use client'
import React from 'react'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaRobot } from 'react-icons/fa'

interface ChatBubbleProps {
  sender: 'user' | 'bot'
  message: string
}

export default function ChatBubble({ sender, message }: ChatBubbleProps) {
  const isUser = sender === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-[#1e1e1e] text-white rounded-full flex items-center justify-center mr-2 shadow">
          <FaRobot className="text-sm" />
        </div>
      )}

      <div
        className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-lg text-sm shadow-md ${
          isUser ? 'bg-blue-600 text-white ml-2' : 'bg-[#3a3a3a] text-gray-200'
        }`}
      >
        {message}
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center ml-2 shadow">
          <FaUser className="text-sm" />
        </div>
      )}
    </motion.div>
  )
}

