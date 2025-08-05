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
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
          }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 25 + 15,
            repeat: Infinity,
            ease: "easeInOut"
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-5xl mx-auto">
          {/* Main Title Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              Eigen
            </h1>
            <div className="text-lg md:text-xl lg:text-2xl text-blue-400 font-light tracking-wider mb-8">
              Quantum Computing Platform
            </div>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Experience the future of computation. Request access to our quantum platform 
              and discover what&apos;s possible when classical meets quantum.
            </motion.p>
          </motion.div>

          {/* Demo Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="glass-effect rounded-2xl p-6 md:p-8 lg:p-10 max-w-3xl mx-auto"
          >
            {!submitted ? (
              <>
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">Request Demo Access</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
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
                      rows={3}
                      value={formData.useCase}
                      onChange={handleInputChange}
                      className="input-primary w-full resize-none"
                      placeholder="Describe how you plan to use Eigen..."
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.email}
                      className="btn-primary w-full py-3 md:py-4 text-base md:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Opening Email Client...' : 'Request Demo Access'}
                    </motion.button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
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
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Your email client should have opened with a pre-filled message. 
                  If not, please send an email to{' '}
                  <a href="mailto:realxanamire@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
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
        </div>
      </div>
    </div>
  )
}
