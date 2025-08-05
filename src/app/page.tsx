'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

const GridBackground = () => {
  return (
    <div className="absolute inset-0 pattern-grid opacity-20" />
  )
}

const QuantumParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
          }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create email body
    const emailBody = `Demo Request from ${formData.name}

Company: ${formData.company}
Email: ${formData.email}
Use Case: ${formData.useCase}

Please respond to arrange a demo session.`

    // Create mailto link
    const mailtoLink = `mailto:realxanamire@gmail.com?subject=Eigen Demo Request - ${formData.name}&body=${encodeURIComponent(emailBody)}`
    
    // Open email client
    window.location.href = mailtoLink
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GridBackground />
      <QuantumParticles />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center max-w-4xl w-full"
        >
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              Eigen
            </h1>
            <div className="text-xl md:text-2xl text-blue-400 font-light tracking-wider">
              Quantum Computing Platform
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the future of computation. Request access to our quantum platform 
            and discover what&apos;s possible when classical meets quantum.
          </motion.p>

          {/* Demo Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="glass-effect rounded-3xl p-8 md:p-12 max-w-2xl mx-auto"
          >
            {!submitted ? (
              <>
                <h2 className="text-2xl font-semibold text-white mb-8">Request Demo Access</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-primary w-full"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-primary w-full"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="input-primary w-full"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Intended Use Case
                    </label>
                    <textarea
                      name="useCase"
                      rows={4}
                      value={formData.useCase}
                      onChange={handleInputChange}
                      className="input-primary w-full resize-none"
                      placeholder="Describe how you plan to use Eigen..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email}
                    className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Opening Email Client...' : 'Request Demo Access'}
                  </motion.button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-4">Request Sent!</h3>
                <p className="text-gray-400 mb-6">
                  Your email client should have opened with a pre-filled message. 
                  If not, please send an email to{' '}
                  <a href="mailto:realxanamire@gmail.com" className="text-blue-400 hover:text-blue-300">
                    realxanamire@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => {setSubmitted(false); setFormData({name:'', email:'', company:'', useCase:''})}}
                  className="btn-secondary"
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-mono">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>QUANTUM SYSTEMS OPERATIONAL</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
