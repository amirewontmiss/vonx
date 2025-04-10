'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const navItems = [
  { name: 'VonX', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'API', href: '/api' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  return (
    <>
      {/* Sidebar */}
      <div className={`h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out ${open ? 'w-60' : 'w-0 overflow-hidden'}`}>
        <div className="h-full bg-black text-white p-6 border-r border-gray-800 relative">
          {/* Toggle button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
          >
            <FiChevronLeft size={20} />
          </button>

          <h1 className="text-2xl font-extrabold text-white mb-6 tracking-wide">
            <span className="text-white">Von</span><span className="text-blue-500">X</span>
          </h1>

          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg font-medium transition-colors ${
                  pathname === item.href ? 'text-white bg-[#1e1e1e] px-3 py-2 rounded' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Show sidebar again */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-black border border-gray-700 rounded-full text-white hover:bg-gray-800"
        >
          <FiChevronRight size={20} />
        </button>
      )}
    </>
  )
}

