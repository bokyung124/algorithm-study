import type { GraphVisualizationStep } from '@/types/visualization'

interface Props {
  step: GraphVisualizationStep
}

export default function GraphVisualization({ step }: Props) {
  const nodes = [...new Set([...step.visited, ...step.queue, ...step.edges.flat()])]
  if (step.current && !nodes.includes(step.current)) nodes.push(step.current)
  nodes.sort()

  const nodeCount = nodes.length
  const cx = 200
  const cy = 150
  const radius = Math.min(100, 40 + nodeCount * 10)

  const positions: Record<string, { x: number; y: number }> = {}
  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodeCount - Math.PI / 2
    positions[node] = {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    }
  })

  const getNodeColor = (node: string) => {
    if (node === step.current) return '#f59e0b' // amber - current
    if (step.visited.includes(node)) return '#6366f1' // indigo - visited
    if (step.queue.includes(node)) return '#93c5fd' // light blue - in queue
    return '#d1d5db' // gray - unvisited
  }

  const getNodeTextColor = (node: string) => {
    if (node === step.current || step.visited.includes(node)) return '#fff'
    return '#374151'
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={400} height={300} className="overflow-visible">
        {/* Edges */}
        {step.edges.map(([from, to], i) => {
          const fromPos = positions[from]
          const toPos = positions[to]
          if (!fromPos || !toPos) return null
          const dx = toPos.x - fromPos.x
          const dy = toPos.y - fromPos.y
          const len = Math.sqrt(dx * dx + dy * dy)
          const nodeRadius = 18
          const endX = toPos.x - (dx / len) * nodeRadius
          const endY = toPos.y - (dy / len) * nodeRadius
          return (
            <line
              key={i}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={endX}
              y2={endY}
              stroke="#cbd5e1"
              strokeWidth={2}
              markerEnd="url(#arrowhead)"
            />
          )
        })}
        {/* Arrow marker */}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#cbd5e1" />
          </marker>
        </defs>
        {/* Nodes */}
        {nodes.map((node) => {
          const pos = positions[node]
          if (!pos) return null
          return (
            <g key={node}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={18}
                fill={getNodeColor(node)}
                className="transition-all duration-300"
                stroke={node === step.current ? '#d97706' : 'transparent'}
                strokeWidth={3}
              />
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={getNodeTextColor(node)}
                fontSize={13}
                fontWeight="bold"
              >
                {node}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Queue/Stack display */}
      {step.queue.length > 0 && (
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-xs text-gray-500 font-medium">
            {step.edges.length > 0 ? '대기열' : '스택'}:
          </span>
          {step.queue.map((node, i) => (
            <span key={i} className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
              {node}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
