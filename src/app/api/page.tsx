'use client'
export default function APIPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">VonX API ⚙️</h1>
      <p className="text-gray-300">
        The VonX API lets you integrate QuantumGPTMini into your own applications. Make POST requests to /generate with a prompt, and stream back completions powered by quantum-inspired models.
      </p>
    </div>
  );
}

