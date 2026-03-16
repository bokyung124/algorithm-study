import type { ArrayVisualizationStep } from '@/types/visualization'

interface Props {
  step: ArrayVisualizationStep
}

export default function ArrayVisualization({ step }: Props) {
  const maxVal = Math.max(...step.array, 1)
  const barWidth = Math.max(20, Math.min(60, 500 / step.array.length))
  const svgWidth = step.array.length * (barWidth + 4) + 4
  const svgHeight = 200
  const hasPointers = step.pointers && step.pointers.length > 0

  const getBarColor = (index: number) => {
    if (step.sorted?.includes(index)) return '#10b981' // green
    if (step.swapped?.includes(index)) return '#f59e0b' // amber
    if (step.comparing?.includes(index)) return '#6366f1' // indigo
    if (step.windowStart !== undefined && step.windowEnd !== undefined &&
        index >= step.windowStart && index <= step.windowEnd) return '#a78bfa' // violet
    return '#94a3b8' // gray
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={svgWidth} height={svgHeight + (hasPointers ? 50 : 30)} className="overflow-visible">
        {step.array.map((value, i) => {
          const barHeight = (value / maxVal) * (svgHeight - 20)
          const x = i * (barWidth + 4) + 4
          const y = svgHeight - barHeight
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={3}
                fill={getBarColor(i)}
                className="transition-all duration-300"
              />
              <text
                x={x + barWidth / 2}
                y={svgHeight + 16}
                textAnchor="middle"
                className="text-xs fill-gray-600"
                fontSize={12}
              >
                {value}
              </text>
            </g>
          )
        })}

        {/* Pointers */}
        {step.pointers?.map((ptr, i) => {
          const x = ptr.index * (barWidth + 4) + 4 + barWidth / 2
          const y = svgHeight + 30
          return (
            <g key={`ptr-${i}`}>
              <text
                x={x}
                y={y + 12}
                textAnchor="middle"
                fill={ptr.color}
                fontSize={12}
                fontWeight="bold"
              >
                {ptr.label}
              </text>
              <line
                x1={x}
                y1={svgHeight + 20}
                x2={x}
                y2={y}
                stroke={ptr.color}
                strokeWidth={2}
              />
              <polygon
                points={`${x},${svgHeight + 20} ${x - 3},${svgHeight + 25} ${x + 3},${svgHeight + 25}`}
                fill={ptr.color}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
