"use client";
import Sidebar from "@/components/Sidebar";

export default function APIPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">VonX API ⚙️</h1>
        <p className="text-gray-300">
          The VonX API lets you integrate QuantumGPTMini into your own applications. Make POST requests to `/generate` with a prompt, and stream back completions powered by quantum-inspired models.
        </p>
      </main>
    </div>
  );
}

