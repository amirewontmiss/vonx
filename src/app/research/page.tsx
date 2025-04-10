"use client";
import Sidebar from "@/components/Sidebar";

export default function ResearchPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Research 🔬</h1>
        <p className="text-gray-300">
          VonX is pioneering Quantum Neural Networks (QNNs) by combining classical transformers with quantum entanglement circuits. Our architecture explores Qiskit-powered circuit embeddings, variational QNNs, and advanced hybrid attention to push the boundaries of what small models can do.
        </p>
      </main>
    </div>
  );
}

