import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "src/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VonX",
  description: "QuantumGPTMini: A Quantum AI breakthrough",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900 p-6 space-y-6 fixed h-full border-r border-zinc-800">
          <h1 className="text-2xl font-bold text-white tracking-tight">Vonx</h1>
          <nav className="flex flex-col gap-4 text-sm text-zinc-400">
            <a href="/" className="hover:text-white">Vonx</a>
            <a href="/research" className="hover:text-white">Research</a>
            <a href="/api" className="hover:text-white">API</a>
            <a href="/about" className="hover:text-white">About</a>
            <a href="/news" className="hover:text-white">News</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 p-8 w-full overflow-auto">{children}</main>
      </body>
    </html>
  );
}
