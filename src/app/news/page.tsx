"use client";
import Sidebar from "@/components/Sidebar";

export default function NewsPage() {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Latest News 📰</h1>
        <ul className="text-gray-300 space-y-2">
          <li>🚀 VonX UI launched on Vercel and API hosted on Render.</li>
          <li>🧪 Working on streaming tokens and real-time avatars.</li>
          <li>📚 Research underway on hybrid quantum attention mechanisms.</li>
          <li>🤖 First prototype trained on Wikipedia with quantum layers.</li>
        </ul>
      </main>
    </div>
  );
}

