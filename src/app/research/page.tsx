'use client'
export default function ResearchPage() {
  return (
    <div className="flex bg-black text-white h-screen">

      <main className="flex-1 overflow-y-auto p-10 space-y-16">
        {/* Section 1: Kernel Intro */}
        <section className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold">Quantum OS Kernel Research</h1>
          <p className="text-gray-300 text-lg">
            VonX is building EigenOS — the first quantum-native operating system kernel. It orchestrates hybrid quantum-classical computation across simulators and real QPUs with deterministic scheduling, memory-safe execution, and real-time control.
          </p>
          <p className="text-gray-300 text-lg">
            Explore a mini, simple and working prototype at <a href="https://haulvisor.vercel.app" className="underline">haulvisor.vercel.app</a>.
          </p>
          <p className="text-gray-300 text-lg">
            EigenOS treats quantum processes with the same rigor as classical OSes treat processes, threads, and memory. It fills the essential system-level gap required to unlock scalable, production-grade quantum AI.
          </p>
        </section>

        {/* Section 2: Hybrid Models */}
        <section className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">Focus on Quantum–Classical AI Models</h2>
          <p className="text-gray-300 text-lg">
            Our work extends far beyond infrastructure. We’re developing models that leverage EigenOS to run hybrid architectures efficiently:
          </p>
          <p className="text-gray-300 text-lg">
            <strong>QuantumGPTMini</strong>, a token-to-qubit transformer using entanglement-based attention and variational feedforward networks.
          </p>
          <p className="text-gray-300 text-lg">
            Integration of EigenOS primitives enables low-latency hybrid inference, streaming responses from CPU→QPU→CPU.
          </p>
          <p className="text-gray-300 text-lg">
            These models prove EigenOS’s worth and enable rich experiments in hybrid AI.
          </p>
          <p className="text-gray-300 text-lg">
            A recent study by Amire Ramazan—“QuantumGPTMini: A Hybrid Quantum-Classical Transformer for Enhanced NLP”—documents the architecture and benchmark performance. Published April 28, 2025, it outlines how QuantumGPTMini uses about one million classical parameters alongside lightweight quantum circuits. <a href="https://www.authorea.com/users/918341/articles/1290843-quantumgptmini-a-hybrid-quantum-classical-transformer-for-enhanced-nlp" className="underline">Read the paper</a>.
          </p>
        </section>

        {/* Section 3: Research Roadmap */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">Roadmap</h2>
          <p className="text-gray-300 text-lg">Roadmap details coming soon.</p>
        </section>
      </main>
    </div>
  )
}

