import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

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
        

        {/* Main Content */}
        <main className="ml-64 p-8 w-full overflow-auto">{children}</main>
      </body>
    </html>
  );
}
