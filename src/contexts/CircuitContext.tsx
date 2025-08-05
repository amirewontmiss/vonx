'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { v4 as uuid } from 'uuid'

/** Each gate holds its type, position, and an array of numeric params (θ, φ, etc.) */
export interface Gate {
  id: string
  type: string        // e.g. 'RX' | 'RY' | 'H' | 'CNOT' | …
  column: number
  wire: number
  params: number[]    // e.g. [θ] for RX/RY, [] for H/CNOT
}

/** The complete circuit state: number of wires and a flat list of gates */
export interface CircuitState {
  numWires: number
  gates: Gate[]
}

type Action =
  | { type: 'ADD_GATE';      gateType: string; column: number; wire: number }
  | { type: 'REMOVE_GATE';   id: string }
  | { type: 'UPDATE_PARAMS'; id: string; params: number[] }
  | { type: 'RESET' }

/** Reducer handles all gate CRUD operations */
function reducer(state: CircuitState, action: Action): CircuitState {
  switch (action.type) {
    case 'ADD_GATE':
      return {
        ...state,
        gates: [
          ...state.gates,
          {
            id: uuid(),
            type: action.gateType,
            column: action.column,
            wire: action.wire,
            params: []  // start with no params; user will set via dialog
          }
        ]
      }

    case 'REMOVE_GATE':
      return {
        ...state,
        gates: state.gates.filter(g => g.id !== action.id),
      }

    case 'UPDATE_PARAMS':
      return {
        ...state,
        gates: state.gates.map(g =>
          g.id === action.id
            ? { ...g, params: action.params }
            : g
        ),
      }

    case 'RESET':
      return { ...state, gates: [] }

    default:
      return state
  }
}

const CircuitContext = createContext<{
  state: CircuitState
  dispatch: React.Dispatch<Action>
} | undefined>(undefined)

export const CircuitProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    numWires: 2,
    gates: [],
  })

  return (
    <CircuitContext.Provider value={{ state, dispatch }}>
      {children}
    </CircuitContext.Provider>
  )
}

/** Hook to access circuit state & dispatch actions */
export const useCircuit = () => {
  const context = useContext(CircuitContext)
  if (!context) {
    throw new Error('useCircuit must be used within a CircuitProvider')
  }
  return context
}

