import type { StackVisualizationStep } from '@/types/visualization'

interface Props {
  step: StackVisualizationStep
}

export default function StackVisualization({ step }: Props) {
  const maxItems = 8
  const itemHeight = 36
  const itemWidth = 80
  const svgHeight = maxItems * itemHeight + 40
  const svgWidth = itemWidth + 60

  return (
    <div className="flex flex-col items-center">
      <svg width={svgWidth} height={svgHeight} className="overflow-visible">
        {/* Stack container */}
        <rect
          x={25}
          y={10}
          width={itemWidth + 10}
          height={maxItems * itemHeight + 10}
          fill="none"
          stroke="#d1d5db"
          strokeWidth={2}
          rx={4}
        />

        {/* Bottom label */}
        <text x={svgWidth / 2} y={svgHeight - 5} textAnchor="middle" className="text-xs fill-gray-400" fontSize={11}>
          bottom
        </text>

        {/* Stack items (bottom to top) */}
        {step.items.map((item, i) => {
          const y = 15 + (maxItems - 1 - i) * itemHeight
          const isHighlighted = i === step.highlight
          const isPush = isHighlighted && step.action === 'push'

          return (
            <g key={i}>
              <rect
                x={30}
                y={y}
                width={itemWidth}
                height={itemHeight - 4}
                rx={4}
                fill={isPush ? '#ddd6fe' : isHighlighted ? '#fecaca' : '#e0e7ff'}
                stroke={isPush ? '#7c3aed' : isHighlighted ? '#ef4444' : '#818cf8'}
                strokeWidth={isHighlighted ? 2 : 1}
                className="transition-all duration-300"
              />
              <text
                x={30 + itemWidth / 2}
                y={y + (itemHeight - 4) / 2 + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
                fontWeight="bold"
                fill="#4338ca"
              >
                {item}
              </text>
            </g>
          )
        })}

        {/* Top pointer */}
        {step.items.length > 0 && (
          <>
            <text
              x={itemWidth + 45}
              y={15 + (maxItems - step.items.length) * itemHeight + (itemHeight - 4) / 2}
              fontSize={11}
              fill="#6366f1"
              fontWeight="bold"
            >
              ← top
            </text>
          </>
        )}
      </svg>
    </div>
  )
}
