'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LiveLossChart from './LiveLossChart'

const layerOptions = ['Input', 'HybridQNN', 'QuantumLayer', 'Dense', 'Output']
const datasetOptions = ['XOR', 'Circle', 'Gaussian']
const learningRates = [0.01, 0.03, 0.1]

export default function QNNPlayground() {
  const [selectedDataset, setSelectedDataset] = useState('XOR')
  const [learningRate, setLearningRate] = useState(0.03)
  const [layers, setLayers] = useState<string[]>([])
  const [lossHistory, setLossHistory] = useState<number[]>([])
  const [status, setStatus] = useState('Training Ready')
  const [finalLoss, setFinalLoss] = useState<number | null>(null)
  const [finalAcc, setFinalAcc] = useState<number | null>(null)

  const handleLayerDrop = (layer: string) => {
    setLayers([...layers, layer])
  }

  const resetLayers = () => {
    setLayers([])
    setFinalLoss(null)
    setFinalAcc(null)
    setLossHistory([])
  }

  const startTraining = async () => {
    setStatus('Training...')
    const dataset = selectedDataset === 'XOR'
      ? Array.from({ length: 200 }, () => {
          const x = Math.random() * 2 - 1
          const y = Math.random() * 2 - 1
          const label = (x > 0) !== (y > 0) ? 1 : 0
          return { x, y, label }
        })
      : [] // More datasets later

    const response = await fetch('http://127.0.0.1:8000/train', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataset,
        layers,
        learningRate,
        epochs: 20
      })
    })

    const result = await response.json()
    setFinalLoss(result.finalLoss)
    setFinalAcc(result.finalAcc)
    setLossHistory(result.losses)
    setStatus('Training Complete')
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 text-white">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 p-4 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800">
        <div className="mb-4">
          <h2 className="font-semibold text-sm mb-1">🧬 Dataset</h2>
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="w-full bg-zinc-800 p-2 rounded text-sm"
          >
            {datasetOptions.map((ds) => (
              <option key={ds}>{ds}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-sm mb-1">⚙️ Learning Rate</h2>
          <select
            value={learningRate}
            onChange={(e) => setLearningRate(Number(e.target.value))}
            className="w-full bg-zinc-800 p-2 rounded text-sm"
          >
            {learningRates.map((lr) => (
              <option key={lr} value={lr}>{lr}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-sm mb-1">⚠️ Layer Blocks</h2>
          {layerOptions.map((layer) => (
            <button
              key={layer}
              onClick={() => handleLayerDrop(layer)}
              className="w-full mb-1 p-2 text-sm bg-zinc-800 hover:bg-zinc-700 rounded"
            >
              {layer}
            </button>
          ))}
        </div>

        <button
          onClick={resetLayers}
          className="w-full p-2 text-sm bg-red-600 hover:bg-red-700 rounded font-semibold"
        >
          ❌ Reset Layers
        </button>
      </div>

      {/* Playground */}
      <div className="flex-1 grid grid-cols-1 gap-4">
        <div className="p-4 bg-zinc-900 rounded-xl shadow border border-zinc-800">
          <div className="mb-2 text-sm text-gray-400">🧠 Your QNN Layers</div>
          <div className="flex flex-wrap gap-2">
            {layers.length === 0 ? (
              <div className="text-sm text-gray-500 italic">
                🧠 Drag layers here to build your QNN...
              </div>
            ) : (
              layers.map((layer, i) => (
                <div
                  key={i}
                  className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full"
                >
                  {layer}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Loss Chart */}
        {lossHistory.length > 0 && <LiveLossChart loss={lossHistory} />}

        {/* Training Stats */}
        <div className="flex flex-col gap-1 text-sm bg-zinc-900 rounded-xl shadow p-4 border border-zinc-800">
          <h2 className="text-white font-semibold text-sm mb-1">📊 Training Stats</h2>
          <div>Final Loss: <span className="text-green-400">{finalLoss?.toFixed(3) ?? '--'}</span></div>
          <div>Final Accuracy: <span className="text-green-400">{finalAcc?.toFixed(2) ?? '--'}</span></div>
          <div>Status: <span className="text-yellow-400">{status}</span></div>
        </div>

        {/* Train Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={startTraining}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow text-sm font-semibold"
        >
          🚀 Start Training
        </motion.button>
      </div>
    </div>
  )
}

