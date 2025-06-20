'use client'
export default function AboutPage() {
  return (
    <div className="flex bg-black text-white h-screen">

      <main className="flex-1 overflow-y-auto p-10 space-y-16">
        {/* Section 1: Intro */}
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About VonX</h1>
          <p className="text-gray-300 text-lg">
            VonX is the world’s first live prototype of a Quantum Transformer UI + API. It is powered by an experimental AI model named <span className="text-white font-semibold">QuantumGPTMini</span>—built using variational quantum circuits, quantum entanglement, and angle-encoded embeddings.
          </p>
        </section>

        {/* Section 2: Our Mission */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-400">
            We&apos;re on a mission to pioneer hybrid classical-quantum neural networks that can push beyond the limits of conventional AI. Our goal is to make quantum-native transformers real—and accessible to the world.
          </p>
        </section>

        {/* Section 3: Founder Info */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">Founder</h2>
          <p className="text-gray-400">
            VonX was founded by <span className="text-white font-semibold">Amire Ramazan</span>, an AI & quantum researcher dedicated to building a full-stack quantum AI startup from research to interface, from core models to frontend applications.
          </p>
        </section>

        {/* Section 4: Stack Overview */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">Stack</h2>
          <ul className="list-disc pl-6 text-gray-400 space-y-1">
            <li>Quantum Model: Pennylane + PyTorch + Qiskit</li>
            <li>API: FastAPI deployed on Render</li>
            <li>UI: Next.js + Tailwind + Vercel</li>
            <li>Data: Wikipedia (subset or full)</li>
          </ul>
        </section>

        {/* Section 5: What's Next */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">What’s Next</h2>
          <ul className="list-disc pl-6 text-gray-400 space-y-1">
            <li>Token streaming</li>
            <li>Avatars and conversation memory</li>
            <li>Quantum model optimization for real hardware (IBM / Braket)</li>
            <li>Publishing a research paper on Quantum Transformers</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

