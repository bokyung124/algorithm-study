import type { GridVisualizationStep } from '@/types/visualization'

interface Props {
  step: GridVisualizationStep
}

export default function GridVisualization({ step }: Props) {
  const cellSize = Math.min(50, 260 / step.size)
  const svgSize = step.size * cellSize + 4

  const isPlaced = (r: number, c: number) =>
    step.placed?.some(([pr, pc]) => pr === r && pc === c) ?? false

  const isConflict = (r: number, c: number) =>
    step.conflicts?.some(([cr, cc]) => cr === r && cc === c) ?? false

  const isCurrent = (r: number, c: number) =>
    step.current?.[0] === r && step.current?.[1] === c

  return (
    <div className="flex flex-col items-center">
      <svg width={svgSize} height={svgSize} className="overflow-visible">
        {Array.from({ length: step.size }, (_, row) =>
          Array.from({ length: step.size }, (_, col) => {
            const x = col * cellSize + 2
            const y = row * cellSize + 2
            const isDark = (row + col) % 2 === 1
            const placed = isPlaced(row, col)
            const conflict = isConflict(row, col)
            const current = isCurrent(row, col)

            let fill = isDark ? '#e2e8f0' : '#f8fafc'
            if (placed) fill = '#818cf8'
            if (conflict) fill = '#fca5a5'
            if (current) fill = '#fbbf24'

            return (
              <g key={`${row}-${col}`}>
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  fill={fill}
                  stroke="#cbd5e1"
                  strokeWidth={1}
                  className="transition-all duration-300"
                />
                {(placed || current) && (
                  <text
                    x={x + cellSize / 2}
                    y={y + cellSize / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={cellSize * 0.5}
                    fill={placed ? '#fff' : '#92400e'}
                  >
                    ♛
                  </text>
                )}
              </g>
            )
          })
        )}
      </svg>
    </div>
  )
}
