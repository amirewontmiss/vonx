'use client'
export default function APIPage() {
  return (
    <div className="flex bg-black text-white h-screen">

      <main className="flex-1 overflow-y-auto p-10 space-y-16">
        {/* Section 1: Intro */}
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">⚙️ VonX API</h1>
          <p className="text-gray-300 text-lg">
            Use the VonX API to generate responses from the QuantumGPTMini model. Simple POST request. Fast. Lightweight. Experimental.
          </p>
        </section>

        {/* Section 2: Base URL */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">🔗 Base URL</h2>
          <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700 text-sm text-blue-400">
            https://quantumgptmini-api.onrender.com/generate
          </div>
        </section>

        {/* Section 3: Request Format */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">📤 POST Request</h2>
          <p className="text-gray-300 mb-2">Body (JSON):</p>
          <pre className="bg-zinc-900 p-4 rounded-md border border-zinc-700 text-sm text-green-300">
{`{
  "text": "Hello, quantum world!"
}`}
          </pre>
        </section>

        {/* Section 4: Sample Response */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">📥 Sample Response</h2>
          <pre className="bg-zinc-900 p-4 rounded-md border border-zinc-700 text-sm text-yellow-300">
{`{
  "response": "Hello, quantum world! The future is entangled..."
}`}
          </pre>
        </section>

        {/* Section 5: Use Cases */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">🧠 Use Cases</h2>
          <ul className="list-disc text-gray-400 pl-6 space-y-1">
            <li>🔹 AI-powered chatbots</li>
            <li>🔹 Experimental reasoning systems</li>
            <li>🔹 Quantum-aware educational tools</li>
          </ul>
        </section>

        {/* Section 6: Coming Soon */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">⏳ Coming Soon</h2>
          <ul className="list-disc text-gray-400 pl-6 space-y-1">
            <li>🔸 Streaming token generation</li>
            <li>🔸 Custom prompt engineering</li>
            <li>🔸 Auth tokens & usage tracking</li>
          </ul>
        </section>
      </main>
    </div>
    )
  }

