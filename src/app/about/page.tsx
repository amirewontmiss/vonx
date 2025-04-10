"use client";

import Sidebar from "@/components/Sidebar";

export default function AboutPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">About VonX 🧠</h1>
        <p className="text-gray-300">
          VonX was founded by Amire Ramazan with the mission to build the world’s most powerful quantum AI models. What started as QuantumGPTMini is now evolving into a full-stack quantum AI ecosystem — from research to application, and eventually into quantum hardware.
        </p>
      </main>
    </div>
  );
}

