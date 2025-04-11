'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-screen">
      <Sidebar open={open} setOpen={setOpen} />
      <main
        className={`transition-all duration-300 flex-1 ${
          open ? 'ml-60' : 'ml-4'
        } p-4`}
      >
        {children}
      </main>
    </div>
  )
}


