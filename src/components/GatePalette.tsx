'use client'
import { useDraggable } from '@dnd-kit/core'

const GATES = ['RX','RY','H']

export default function GatePalette(){
  return (
    <div className="flex flex-col gap-2">
      {GATES.map(type=> <DraggableGate key={type} type={type}/>)}
    </div>
  )
}

function DraggableGate({type}:{type:string}){
  const {attributes, listeners, setNodeRef, isDragging} = useDraggable({id:type})
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
         className={`select-none p-2 text-xs rounded
                   ${isDragging?'bg-blue-400':'bg-zinc-700 hover:bg-zinc-600'}`}>
      {type}
    </div>
  )
}

