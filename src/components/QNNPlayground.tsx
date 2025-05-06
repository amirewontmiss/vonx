'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LiveLossChart from '@/components/LiveLossChart'
import DecisionMap   from '@/components/DecisionMap'

/* ───────────────────────── Options ─────────────────────────── */
const DATASETS    = ['XOR', 'Circle', 'Gaussian']
const LAYER_BLOCK = ['Input', 'HybridQNN', 'QuantumLayer', 'Dense', 'Output']
const LEARN_RATES = [0.005, 0.01, 0.03, 0.1]

/* ───────────────────────── Component ───────────────────────── */
export default function QNNPlayground() {
  /* UI state */
  const [dataset, setDataset] = useState('XOR')
  const [lr, setLr]           = useState(0.03)
  const [layers, setLayers]   = useState<string[]>([])

  /* Training results */
  const [losses, setLosses]   = useState<number[]>([])
  const [finalLoss, setFinalLoss] = useState<number | null>(null)
  const [finalAcc,  setFinalAcc]  = useState<number | null>(null)
  const [grid, setGrid]       = useState<number[][] | null>(null)
  const [status, setStatus]   = useState('Ready')

  /* ───────── Helpers ───────── */
  const addLayer = (l:string)=> setLayers(prev=>[...prev,l])
  const reset = ()=>{ setLayers([]); setLosses([]); setGrid(null)
    setFinalLoss(null); setFinalAcc(null); setStatus('Ready') }

  /* ───────── Training ───────── */
  const startTraining = async () => {
    setStatus('Training…'); setLosses([]); setFinalLoss(null); setFinalAcc(null); setGrid(null)

    /* quick XOR sample -> later send real dataset choice  */
    const sample = Array.from({length:300},()=>{const x=Math.random()*2-1
      const y=Math.random()*2-1; return {x,y,label:(x>0)!==(y>0)?1:0}})

    try{
      const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:9000'
      const res = await fetch(`${API}/train`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          dataset : sample,
          layers,
          learningRate: lr,
          epochs : 1000
        })
      })

      if(!res.ok){ setStatus('Backend error'); console.error(await res.text()); return }
      const data = await res.json()
      /* validate */
      setLosses( Array.isArray(data.losses)? data.losses: [] )
      setFinalLoss(typeof data.finalLoss==='number'?data.finalLoss:null)
      setFinalAcc(typeof data.finalAcc==='number'?data.finalAcc:null)
      setGrid( Array.isArray(data.decisionMap)? data.decisionMap : null )
      setStatus('Done ✅')
    }catch(e){ console.error(e); setStatus('Network error') }
  }

  /* ───────── Render ───────── */
  return(
    <div className="flex flex-col md:flex-row gap-6 text-white max-w-7xl mx-auto p-6">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow space-y-6">
        <section>
          <h3 className="text-sm font-semibold mb-1">🧬 Dataset</h3>
          <select value={dataset} onChange={e=>setDataset(e.target.value)}
                  className="w-full bg-zinc-800 p-2 rounded text-sm">{DATASETS.map(d=>
            <option key={d}>{d}</option>)}</select>
        </section>

        <section>
          <h3 className="text-sm font-semibold mb-1">⚙️ Learning Rate</h3>
          <select value={lr} onChange={e=>setLr(parseFloat(e.target.value))}
                  className="w-full bg-zinc-800 p-2 rounded text-sm">{LEARN_RATES.map(r=>
            <option key={r} value={r}>{r}</option>)}</select>
        </section>

        <section>
          <h3 className="text-sm font-semibold mb-1">📐 Layer Blocks</h3>
          {LAYER_BLOCK.map(l=>(
            <button key={l} onClick={()=>addLayer(l)}
                    className="w-full p-2 mb-1 bg-zinc-800 hover:bg-zinc-700 rounded text-sm">{l}</button>
          ))}
        </section>

        <button onClick={reset}
                className="w-full p-2 bg-red-600 hover:bg-red-700 rounded font-semibold text-sm">❌ Reset</button>
      </aside>

      {/* Main Pane */}
      <main className="flex-1 flex flex-col gap-6">

        {/* Layer list */}
        <section className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow">
          <h3 className="text-sm text-gray-400 mb-2">🧠 Current Layers</h3>
          {layers.length?(
            <div className="flex flex-wrap gap-2">{layers.map((l,i)=>
              <span key={i} className="bg-blue-700 px-3 py-1 rounded-full text-xs">{l}</span>)}
            </div>
          ):<p className="italic text-sm text-gray-500">Add blocks from sidebar…</p>}
        </section>

        {/* Decision heat-map */}
        {grid && <DecisionMap grid={grid} />}

        {/* Live loss */}
        {losses.length>0 && <LiveLossChart loss={losses} />}

        {/* Stats */}
        <section className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow text-sm space-y-1">
          <h3 className="font-semibold mb-1">📊 Training Stats</h3>
          <div>Final Loss: <span className="text-green-400">{finalLoss?.toFixed(4)??'--'}</span></div>
          <div>Final Accuracy: <span className="text-green-400">{finalAcc?.toFixed(3)??'--'}</span></div>
          <div>Status: <span className="text-yellow-400">{status}</span></div>
        </section>

        <motion.button whileTap={{scale:.95}} onClick={startTraining}
          className="py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow font-semibold text-sm">
          🚀 Start Training
        </motion.button>
      </main>
    </div>
  )
}

