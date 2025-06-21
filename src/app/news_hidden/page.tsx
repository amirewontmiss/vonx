'use client'
export default function NewsPage() {
  return (
    <div className="flex bg-black text-white h-screen">

      <main className="flex-1 overflow-y-auto p-10 space-y-16">
        {/* Section 1: Header */}
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Latest News</h1>
          <p className="text-gray-300 text-lg">
            Stay up to date with VonX development — feature rollouts, research updates, model breakthroughs, and more.
          </p>
        </section>

        {/* Section 2: Timeline Feed */}
        <section className="max-w-4xl mx-auto space-y-8">
          {/* Item 1 */}
          <div className="border-l-2 border-blue-500 pl-6 relative">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full left-[-7px] top-1.5"></div>
            <h3 className="text-xl font-semibold mb-1">VonX v1.0 Launched (UI + API)</h3>
            <p className="text-gray-400">
              QuantumGPTMini is live on <a href="https://vonx.vercel.app" className="text-blue-500 hover:underline">vonx.vercel.app</a> with a full-stack chat UI and a working API hosted on Render.
            </p>
            <p className="text-xs text-gray-600 mt-1">April 10, 2025</p>
          </div>

          {/* Item 2 */}
          <div className="border-l-2 border-blue-500 pl-6 relative">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full left-[-7px] top-1.5"></div>
            <h3 className="text-xl font-semibold mb-1">Quantum Transformer Paper Planned</h3>
            <p className="text-gray-400">
              Research paper being drafted: &quot;QuantumGPTMini: A Fully Quantum-Native Transformer Using Entangled Attention and Variational Layers.&quot;
            </p>
            <p className="text-xs text-gray-600 mt-1">April 9, 2025</p>
          </div>

          {/* Item 3 */}
          <div className="border-l-2 border-blue-500 pl-6 relative">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full left-[-7px] top-1.5"></div>
            <h3 className="text-xl font-semibold mb-1">Next Features</h3>
            <ul className="text-gray-400 list-disc pl-5">
              <li>Token streaming in real-time</li>
              <li>User avatars</li>
              <li>Memory & conversation history</li>
              <li>Model improvements</li>
            </ul>
            <p className="text-xs text-gray-600 mt-1">Planned for April 2025</p>
          </div>
        </section>
      </main>
    </div>
  )
}

