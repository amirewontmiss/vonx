'use client'
export default function ContactPage() {
  return (
    <div className="flex bg-black text-white h-screen">
      <main className="flex-1 overflow-y-auto p-10 space-y-16">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">
            Email the founder: <a className="underline" href="mailto:realxanamire@gmail.com">realxanamire@gmail.com</a>
          </p>
        </section>
      </main>
    </div>
  )
}