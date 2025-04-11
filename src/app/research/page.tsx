'use client'
export default function ResearchPage() {
  return (
    <div className="flex bg-black text-white h-screen">

      <main className="flex-1 overflow-y-auto p-10 space-y-16">
        {/* Section 1: Intro */}
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">🚀 Quantum Transformer Research</h1>
          <p className="text-gray-300 text-lg">
            VonX is building the world’s first Quantum Transformer model. Our research combines classical language modeling with quantum circuits like variational QNNs and quantum entanglement attention.
          </p>
        </section>

        {/* Section 2: Architecture */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">🧠 Architecture Overview</h2>
          <ul className="list-disc text-gray-400 pl-6 space-y-1">
            <li>🔹 Classical token embedding → angle/amplitude encoded into qubits</li>
            <li>🔹 Quantum attention circuit using entanglement + QFT</li>
            <li>🔹 Quantum FFN built on variational circuits</li>
            <li>🔹 Final measurement collapsed to classical logits</li>
          </ul>
        </section>

        {/* Section 3: Qiskit Circuit Diagram (Placeholder) */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">🔧 Quantum Circuit Sketch</h2>
          <div className="rounded-xl bg-zinc-900 p-6 text-center text-gray-400 border border-zinc-700">
            (Quantum Attention + Feedforward Circuits built with Qiskit & PennyLane)
          </div>
        </section>

        {/* Section 4: Use Cases */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">💡 Why Quantum?</h2>
          <p className="text-gray-300">
            Quantum attention mechanisms may enable:
          </p>
          <ul className="list-disc text-gray-400 pl-6 mt-2 space-y-1">
            <li>🔸 Better symbolic reasoning</li>
            <li>🔸 Native modeling of quantum data (chemistry, physics)</li>
            <li>🔸 Compact expressivity with fewer parameters</li>
          </ul>
        </section>

        {/* Section 5: Research Roadmap */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">🛣️ Roadmap</h2>
          <ul className="list-decimal text-gray-400 pl-6 space-y-1">
            <li>Phase 1 — Build circuit-based transformer blocks (done)</li>
            <li>Phase 2 — Train on wiki dataset on A100 (done)</li>
            <li>Phase 3 — Implement streaming, QPU evals (ongoing)</li>
            <li>Phase 4 — Publish paper & preprint (coming)</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

