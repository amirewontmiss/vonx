'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiChevronLeft, FiChevronRight, FiActivity, FiDatabase, FiSettings, FiUser, FiZap, FiTerminal } from 'react-icons/fi'

const navItems = [
  { name: 'Command Center', href: '/', icon: FiTerminal },
  { name: 'Research', href: '/research', icon: FiActivity },
  { name: 'Sandbox', href: '/sandbox', icon: FiZap },
  { name: 'API', href: '/api', icon: FiDatabase },
  { name: 'About', href: '/about', icon: FiUser },
  { name: 'Contact', href: '/contact', icon: FiSettings }
]

export default function Sidebar({
  open,
  setOpen
}: {
  open: boolean
  setOpen: (val: boolean) => void
}) {
  const pathname = usePathname()

  return (
    <>
      <div className={`fixed top-0 left-0 h-screen glass-effect text-white transition-all duration-300 ease-in-out z-40 ${open ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <div className="h-full p-6 relative pattern-dots">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Header */}
          <div className="mb-12 mt-2">
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
              <span className="text-white">Von</span><span className="text-blue-400">X</span>
            </h1>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              Control Interface
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''} flex items-center gap-3 text-sm font-medium transition-all duration-200 rounded-lg px-3 py-3 group`}
                >
                  <Icon size={16} className={`transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  <span className="tracking-wide">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* System Status */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gray-400">STATUS</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-green-400">ONLINE</span>
                </div>
              </div>
              <div className="text-xs font-mono text-gray-500">
                NEURAL.NET.ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 p-3 glass-effect border border-gray-700/50 rounded-lg text-white hover:border-gray-600 transition-all duration-200 group"
        >
          <FiChevronRight size={18} className="group-hover:text-blue-400 transition-colors duration-200" />
        </button>
      )}
    </>
  )
}

