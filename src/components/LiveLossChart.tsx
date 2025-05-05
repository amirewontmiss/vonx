'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function LiveLossChart({ loss }: { loss: number[] }) {
  const data = loss.map((val, index) => ({ epoch: index + 1, loss: val }))

  return (
    <div className="w-full h-64 p-4 bg-zinc-900 rounded-xl border border-zinc-700 shadow">
      <h2 className="text-white text-sm font-semibold mb-2">📉 Loss Over Epochs</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="epoch" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="loss" stroke="#00e5ff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

