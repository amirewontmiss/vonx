'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'VonX', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'API', href: '/api' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-60 h-screen bg-[#000000] p-6 fixed left-0 top-0 text-white flex flex-col gap-6 border-r border-gray-800 shadow-lg">
      <h1 className="text-2xl font-extrabold text-white mb-2 tracking-wide">
        Von<span className="text-blue-400">X</span>
      </h1>
      <nav className="flex flex-col gap-4 mt-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-lg font-medium px-2 py-1 rounded-md transition-all ${
              pathname === item.href
                ? 'text-white bg-gray-800'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

