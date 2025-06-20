'use client'

import { useState, useEffect } from 'react'

interface ParamDialogProps {
  gateId: string
  initialParams: number[]          // Starting values
  onSave: (id: string, params: number[]) => void
  onClose: () => void
}

/**
 * A simple modal dialog to edit one or more numeric gate parameters.
 * For most gates (RX,RY,RZ) we show a single slider + input for params[0].
 */
export default function ParamDialog({
  gateId,
  initialParams,
  onSave,
  onClose,
}: ParamDialogProps) {
  // local copy of params
  const [params, setParams] = useState<number[]>(initialParams)

  // if initialParams changes (unlikely) reset local state
  useEffect(() => {
    setParams(initialParams)
  }, [initialParams])

  const handleParamChange = (idx: number, value: number) => {
    const copy = [...params]
    copy[idx] = value
    setParams(copy)
  }

  const save = () => {
    onSave(gateId, params)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-zinc-900 rounded-lg p-6 w-[320px] shadow-xl z-10">
        <h2 className="text-white text-lg font-semibold mb-4">
          Edit Gate Parameters
        </h2>

        {params.map((val, idx) => (
          <div key={idx} className="mb-4">
            <label className="text-sm text-gray-300">
              θ<sub>{idx}</sub>: {val.toFixed(3)}
            </label>
            <input
              type="range"
              min={0}
              max={2 * Math.PI}
              step={0.01}
              value={val}
              onChange={(e) =>
                handleParamChange(idx, parseFloat(e.target.value))
              }
              className="w-full mt-1"
            />
            <input
              type="number"
              min={0}
              max={2 * Math.PI}
              step={0.001}
              value={val}
              onChange={(e) =>
                handleParamChange(idx, parseFloat(e.target.value) || 0)
              }
              className="w-full mt-2 p-1 rounded bg-zinc-800 text-sm text-white"
            />
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

