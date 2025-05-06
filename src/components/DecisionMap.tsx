'use client'

interface Props { grid: number[][] }

export default function DecisionMap({ grid }: Props) {
  const rows = grid.length
  const cols = grid[0].length

  const rects = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const p = grid[y][x]

      /* ── crisp discrete colours ── */
      const color = p < 0.5 ? 'rgba(66, 133, 244, 0.9)'   // blue
                            : 'rgba(234, 67, 53, 0.9)'    // red
      rects.push(
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />
      )
    }
  }

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden border border-zinc-800">
      <svg
        viewBox={`0 0 ${cols} ${rows}`}
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
      >
        {rects}
      </svg>
    </div>
  )
}

