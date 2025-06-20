'use client'

import { useState, useRef, useEffect, FC, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion' // For smooth animations

// A simple, typed functional component for the background effect.
const BackgroundParticles: FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
      {/* Example: Simple geometric pattern with CSS */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      {/* For more complex particles, you'd integrate a library like react-tsparticles */}
    </div>
  )
}

// The main Home component, typed to return a JSX.Element.
export default function Home(): JSX.Element {
  const [input, setInput] = useState<string>('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return
    router.push(`/chat?prompt=${encodeURIComponent(input)}`)
  }

  return (
    <div className="relative flex flex-col items-center justify-center text-white px-4 min-h-screen bg-gradient-to-br from-gray-950 to-black overflow-hidden font-sans">
      <BackgroundParticles />

      {/* Main content container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl w-full"
      >
        {/* VonX Corporate Logo/Name */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0, ease: 'easeOut' }}
          className="mb-12 md:mb-16"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter drop-shadow-lg select-none">
            VonX
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium mt-2 tracking-wide uppercase">
            Deep Tech Solutions
          </p>
        </motion.div>

        {/* EigenOS Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-16 md:mb-24 px-4 py-8 w-full bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-700/50"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-tighter text-white drop-shadow-md">
            EigenOS: The OS Kernel for Quantum Systems
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-85">
            We’re building the runtime, compiler, and orchestration stack for
            <br className="hidden md:inline" />
            **quantum-classical workloads**, starting with{' '}
            <strong className="text-blue-400">HaulVisor</strong>, our Quantum Circuit Orchestration Interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://haulvisor.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Open HaulVisor
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-7 7"
                />
              </svg>
            </motion.a>
            <motion.a
              // ----- THIS LINE HAS BEEN UPDATED -----
              href="mailto:amireramazan0809@gmail.com?subject=EigenOS%20Demo%20Request&body=I'm%20interested%20in%20a%20demo%20of%20EigenOS.%20Please%20provide%20me%20with%20more%20information."
              className="inline-flex items-center justify-center bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Demo
            </motion.a>
          </div>
        </motion.div>

        {/* Separator / Visual break */}
        <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-10 md:my-16" />

        {/* Quantum GPT-mini Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mb-10 md:mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 tracking-tighter drop-shadow-lg">
            Quantum GPT<span className="text-blue-500">-mini</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 opacity-90 italic">
            World's first ever experimental <strong className="text-purple-300">Quantum Transformer AI</strong>
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center bg-gray-800 border border-gray-700/70 rounded-3xl px-5 py-4 w-full shadow-2xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-75 transition-all duration-300 ease-in-out">
            <input
              ref={inputRef}
              type="text"
              placeholder="Text..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent text-white w-full focus:outline-none text-lg md:text-xl placeholder-gray-500 pr-4"
            />
            <button
              type="submit"
              className="p-2 ml-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              aria-label="Send query"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}
