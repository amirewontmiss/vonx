'use client'

import React from 'react'

interface Point {
  x: number
  y: number
  label: 0 | 1
}

interface DatasetVisualizerProps {
  data: Point[]
}

export default function DatasetVisualizer({ data }: DatasetVisualizerProps) {
  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden border border-gray-700">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data.map((point, i) => (
          <circle
            key={i}
            cx={50 + point.x * 45}
            cy={50 - point.y * 45}
            r={1.8}
            fill={point.label === 1 ? '#3b82f6' : '#f87171'}
            stroke="#fff"
            strokeWidth={0.2}
          />
        ))}
      </svg>
    </div>
  )
}

