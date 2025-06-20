'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LiveLossChart from '@/components/LiveLossChart'
import DecisionMap   from '@/components/DecisionMap'

/* ───────────────────────── Options ─────────────────────────── */
const DATASETS    = ['XOR', 'Circle', 'Gaussian']
const LAYERS      = ['Input', 'HybridQNN', 'QuantumLayer', 'Dense', 'Output']
const LEARN_RATES = [0.005, 0.01, 0.03, 0.1]

export default function QNNPlayground() {
  /* UI state */
  const [dataset, setDataset] = useState('XOR')
  const [lr,      setLr]      = useState(0.03)
  const [epochs,  setEpochs]  = useState(100)
  const [layers,  setLayers]  = useState<string[]>([])

  /* Training results */
  const [losses, setLosses]  = useState<number[]>([])
  const [grid,   setGrid]    = useState<number[][] | null>(null)
  const [finalLoss, setFinalLoss] = useState<number|null>(null)
  const [finalAcc,  setFinalAcc]  = useState<number|null>(null)
  const [status,    setStatus]    = useState('Ready')

  /* helpers */
  const addLayer = (l:string)=> setLayers(p=>[...p,l])
  const reset = ()=>{ setLayers([]); setLosses([]); setGrid(null)
                      setFinalLoss(null); setFinalAcc(null); setStatus('Ready') }

  /* ───────── train ───────── */
  const startTraining = async () => {
    setStatus('Training…'); setLosses([]); setGrid(null)
    /* tiny XOR sample */
    const sample = Array.from({length:300},()=>{ const x=Math.random()*2-1
      const y=Math.random()*2-1; return {x,y,label:(x>0)!==(y>0)?1:0} })

    try{
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:9000'}/train`,
        { method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({dataset:sample,layers,learningRate:lr,epochs}) }
      )
      if(!res.ok){ setStatus('Backend error'); console.error(await res.text()); return }
      const d = await res.json()
      setLosses(d.losses ?? []); setGrid(d.decisionMap ?? null)
      setFinalLoss(d.finalLoss ?? null); setFinalAcc(d.finalAcc ?? null)
      setStatus('Done')
    }catch(e){ console.error(e); setStatus('Network error') }
  }

  /* ───────── UI ───────── */
  return (
    <div className="flex h-full text-white">

      {/* ── Control panel ───────────────────────────────────── */}
      <aside className="w-[260px] shrink-0 space-y-6 bg-zinc-900 border-r border-zinc-800 p-5">
        {/* dataset */}
        <section>
          <h3 className="font-semibold text-sm mb-1">Dataset</h3>
          <select value={dataset} onChange={e=>setDataset(e.target.value)}
                  className="w-full p-2 rounded bg-zinc-800 text-sm">
            {DATASETS.map(d=> <option key={d}>{d}</option>)}
          </select>
        </section>

        {/* learning rate */}
        <section>
          <h3 className="font-semibold text-sm mb-1">Learning Rate</h3>
          <select value={lr} onChange={e=>setLr(parseFloat(e.target.value))}
                  className="w-full p-2 rounded bg-zinc-800 text-sm">
            {LEARN_RATES.map(v=> <option key={v} value={v}>{v}</option>)}
          </select>
        </section>

        {/* epochs */}
        <section>
          <h3 className="font-semibold text-sm mb-1">Epochs</h3>
          <input type="number" min={5} max={500} step={5}
                 value={epochs} onChange={e=>setEpochs(parseInt(e.target.value))}
                 className="w-full p-2 rounded bg-zinc-800 text-sm text-center"/>
        </section>

        {/* blocks */}
        <section>
          <h3 className="font-semibold text-sm mb-1">Layer Blocks</h3>
          {LAYERS.map(l=>(
            <button key={l} onClick={()=>addLayer(l)}
                    className="w-full mb-1 p-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm">
              {l}
            </button>
          ))}
        </section>

        <button onClick={reset}
                className="w-full p-2 bg-red-600 hover:bg-red-700 rounded font-semibold text-sm">
          Reset
        </button>
      </aside>

      {/* ── Main canvas ─────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6
                        lg:grid-cols-[minmax(500px,1fr)_minmax(320px,0.6fr)]
                        auto-rows-max">

          {/* decision map */}
          {grid && <DecisionMap grid={grid}/>}

          {/* losses + stats */}
          <div className="flex flex-col gap-6">
            {losses.length>0 && <LiveLossChart loss={losses}/>}

            <section className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow text-sm space-y-1">
              <h3 className="font-semibold mb-1">Training Stats</h3>
              <div>Final Loss: <span className="text-green-400">{finalLoss?.toFixed(4)??'--'}</span></div>
              <div>Final Accuracy: <span className="text-green-400">{finalAcc?.toFixed(3)??'--'}</span></div>
              <div>Status: <span className="text-yellow-400">{status}</span></div>
            </section>

            <motion.button whileTap={{scale:.95}} onClick={startTraining}
              className="py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow font-semibold text-sm">
              Start Training
            </motion.button>
          </div>

        </div>
      </main>
    </div>
  )
}

