'use client'

import { Dispatch, SetStateAction } from 'react'

const ALL_FEATURES = [
  'X',
  'Y',
  'X²',
  'Y²',
  'X·Y',
  'sin(X)',
  'sin(Y)',
  'cos(X)',
  'cos(Y)',
]

interface FeatureSelectorProps {
  selected: string[]
  onChange: Dispatch<SetStateAction<string[]>>
}

export default function FeatureSelector({ selected, onChange }: FeatureSelectorProps) {
  const toggle = (feat: string) => {
    if (selected.includes(feat)) {
      onChange(selected.filter((f) => f !== feat))
    } else {
      onChange([...selected, feat])
    }
  }

  return (
    <section>
      <h3 className="font-semibold text-sm mb-1">🔧 Features</h3>
      <div className="grid grid-cols-2 gap-2">
        {ALL_FEATURES.map((feat) => (
          <label key={feat} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(feat)}
              onChange={() => toggle(feat)}
              className="h-4 w-4"
            />
            <span>{feat}</span>
          </label>
        ))}
      </div>
    </section>
  )
}

