'use client'

import React, { useState } from 'react'
import DatasetVisualizer from './DatasetVisualizer'

interface Point {
  x: number
  y: number
  label: 0 | 1
}

const datasets = ['Circle', 'XOR', 'Spiral', 'Linear']
const learningRates = [0.01, 0.03, 0.1]
const availableLayers = ['Input', 'HybridQNN', 'QuantumLayer', 'Dense', 'Output']

function generateDataset(type: string): Point[] {
  const points: Point[] = []
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * 2 - 1
    const y = Math.random() * 2 - 1

    let label: 0 | 1 = 0
    if (type === 'XOR') {
      label = (x > 0) !== (y > 0) ? 1 : 0
    } else if (type === 'Circle') {
      const r = Math.sqrt(x * x + y * y)
      label = r > 0.5 ? 1 : 0
    } else if (type === 'Spiral') {
      const angle = Math.atan2(y, x)
      label = (angle + Math.PI) % (2 * Math.PI) > Math.PI ? 1 : 0
    } else {
      label = y > x ? 1 : 0
    }

    points.push({ x, y, label })
  }
  return points
}

interface TrainResult {
  loss: number[]
  accuracy: number[]
  decisionMap: number[][]
}

export default function QNNPlayground() {
  const [selectedDataset, setSelectedDataset] = useState('XOR')
  const [learningRate, setLearningRate] = useState(0.03)
  const [layers, setLayers] = useState<string[]>([])
  const [trainResult, setTrainResult] = useState<TrainResult | null>(null)
  const [loading, setLoading] = useState(false)

  const dataset = generateDataset(selectedDataset)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dropped = e.dataTransfer.getData('layer')
    if (dropped) {
      setLayers((prev) => [...prev, dropped])
    }
  }

  const handleReset = () => setLayers([])

  const handleTrain = async () => {
    setLoading(true)
    setTrainResult(null)
    try {
      const res = await fetch('http://127.0.0.1:8000/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataset,
          layers,
          learningRate,
          epochs: 25
        })
      })
      const data = await res.json()
      setTrainResult(data)
    } catch (err) {
      console.error('Training failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full h-[80vh] border border-gray-800 rounded-lg overflow-hidden bg-[#111] text-white">
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-[#1a1a1a] p-4 border-r border-gray-700 flex flex-col gap-6 overflow-y-auto">
        <div>
          <h2 className="text-lg font-semibold mb-2">🧬 Dataset</h2>
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="w-full p-2 bg-[#222] rounded text-white"
          >
            {datasets.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">⚙️ Learning Rate</h2>
          <select
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full p-2 bg-[#222] rounded text-white"
          >
            {learningRates.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">📐 Layer Blocks</h2>
          <div className="space-y-2 text-sm">
            {availableLayers.map((layer) => (
              <div
                key={layer}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('layer', layer)}
                className="bg-[#333] px-3 py-2 rounded cursor-move hover:bg-[#444]"
              >
                {layer}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="mt-6 w-full py-2 bg-red-600 rounded hover:bg-red-700 text-sm"
        >
          ❌ Reset Layers
        </button>
      </div>

      {/* CENTER CANVAS */}
      <div
        className="flex-1 bg-[#181818] p-4 relative overflow-y-auto"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="h-[40%] mb-4">
          <DatasetVisualizer data={dataset} />
        </div>

        <div className="mt-4 space-y-3">
          {layers.length === 0 ? (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-gray-500 text-center">
              🧠 Drag layers here to build your QNN...
            </div>
          ) : (
            layers.map((layer, i) => (
              <div
                key={i}
                className="bg-blue-800/50 text-white px-4 py-2 rounded shadow text-sm"
              >
                {layer}
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-72 bg-[#1a1a1a] p-4 border-l border-gray-700 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">📊 Training Stats</h2>
        <ul className="space-y-2 text-sm mb-4">
          <li>
            Final Loss: <span className="text-green-400">
              {trainResult ? trainResult.loss.at(-1)?.toFixed(3) : '--'}
            </span>
          </li>
          <li>
            Final Accuracy: <span className="text-green-400">
              {trainResult ? trainResult.accuracy.at(-1)?.toFixed(2) : '--'}
            </span>
          </li>
          <li>
            Status: <span className="text-yellow-400">Training {loading ? '...' : 'Ready'}</span>
          </li>
        </ul>

        <button
          onClick={handleTrain}
          disabled={loading}
          className="mt-auto w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-sm disabled:opacity-50"
        >
          {loading ? '⏳ Training...' : '🚀 Start Training'}
        </button>
      </div>
    </div>
  )
}

