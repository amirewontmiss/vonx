'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiX, FiMenu, FiHome, FiActivity, FiZap, FiDatabase, FiUser, FiMail } from 'react-icons/fi'

const navItems = [
  { name: 'Main', href: '/', icon: FiHome },
  { name: 'Research', href: '/research', icon: FiActivity },
  { name: 'Sandbox', href: '/sandbox', icon: FiZap },
  { name: 'API', href: '/api', icon: FiDatabase },
  { name: 'About', href: '/about', icon: FiUser },
  { name: 'Contact', href: '/contact', icon: FiMail }
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
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen bg-gray-950/95 backdrop-blur-xl border-r border-gray-800/50 text-white transition-all duration-300 ease-out z-40 ${open ? 'w-72' : 'w-0 overflow-hidden'}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Eigen</h1>
                <p className="text-xs text-gray-400">Quantum Platform</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            >
              <FiX size={18} className="text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className={`transition-colors duration-200 ${
                      isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800/50">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 p-3 bg-gray-950/90 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white hover:bg-gray-900/90 hover:border-gray-600/50 transition-all duration-200 group"
        >
          <FiMenu size={20} className="group-hover:text-blue-400 transition-colors duration-200" />
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

