'use client'
import { useDroppable } from '@dnd-kit/core'
import { useCircuit } from '@/contexts/CircuitContext'

const NUM_COLS = 10

export default function CircuitCanvas(){
  const {state} = useCircuit()

  return (
    <svg width="100%" height={state.numWires*60}>
      {/* grid lines */}
      {Array.from({length:state.numWires}).map((_,w)=>
        <line key={w} x1="0" y1={w*60+30} x2="100%" y2={w*60+30}
              stroke="#333" strokeDasharray="4 4"/> )}

      {/* drop cells */}
      {Array.from({length:NUM_COLS}).map((_,c)=>
        Array.from({length:state.numWires}).map((_,w)=>
          <DropCell key={`${c}-${w}`} column={c} wire={w}/> ))}

      {/* rendered gates */}
      {state.gates.map(g=>
        <text key={g.id} x={g.column*80+30} y={g.wire*60+40}
              fontSize="12" textAnchor="middle" fill="#fff">{g.type}</text>)}
    </svg>
  )
}

function DropCell({column,wire}:{column:number;wire:number}){
  const {isOver,setNodeRef}=useDroppable({id:`cell-${column}-${wire}`, data:{column,wire}})
  return (
    <rect ref={setNodeRef}
          x={column*80} y={wire*60} width="60" height="60"
          fill={isOver?'rgba(0,123,255,0.35)':'transparent'}/>
  )
}

