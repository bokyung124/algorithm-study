import type { TreeVisualizationStep } from '@/types/visualization'

interface Props {
  step: TreeVisualizationStep
}

interface NodePosition {
  x: number
  y: number
}

export default function TreeVisualization({ step }: Props) {
  const nodeMap = new Map(step.nodes.map((n) => [n.id, n]))
  const positions: Record<string, NodePosition> = {}
  const svgWidth = 400
  const svgHeight = 260
  const nodeRadius = 18
  const levelHeight = 65

  // Calculate positions using BFS-based layout
  function layoutTree(rootId: string) {
    const root = nodeMap.get(rootId)
    if (!root) return

    // Calculate depth and total width needed
    function getWidth(id: string | undefined): number {
      if (!id) return 0
      const node = nodeMap.get(id)
      if (!node) return 0
      const leftW = getWidth(node.left)
      const rightW = getWidth(node.right)
      return Math.max(1, leftW + rightW)
    }

    function layout(id: string | undefined, x: number, width: number, depth: number) {
      if (!id) return
      const node = nodeMap.get(id)
      if (!node) return

      positions[id] = { x, y: 30 + depth * levelHeight }

      const leftW = getWidth(node.left)
      const rightW = getWidth(node.right)
      const total = leftW + rightW || 1

      if (node.left) {
        layout(node.left, x - (width * rightW) / (2 * total), width / 2, depth + 1)
      }
      if (node.right) {
        layout(node.right, x + (width * leftW) / (2 * total), width / 2, depth + 1)
      }
    }

    layout(rootId, svgWidth / 2, svgWidth * 0.8, 0)
  }

  const rootNode = step.nodes.find((n) => !step.nodes.some((other) => other.left === n.id || other.right === n.id))
  if (rootNode) layoutTree(rootNode.id)

  const getNodeColor = (id: string) => {
    if (id === step.current) return '#f59e0b'
    if (step.visited.includes(id)) return '#6366f1'
    return '#d1d5db'
  }

  const getTextColor = (id: string) => {
    if (id === step.current || step.visited.includes(id)) return '#fff'
    return '#374151'
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={svgWidth} height={svgHeight} className="overflow-visible">
        {/* Edges */}
        {step.nodes.map((node) => {
          const parentPos = positions[node.id]
          if (!parentPos) return null
          return [node.left, node.right].map((childId) => {
            if (!childId) return null
            const childPos = positions[childId]
            if (!childPos) return null
            return (
              <line
                key={`${node.id}-${childId}`}
                x1={parentPos.x}
                y1={parentPos.y}
                x2={childPos.x}
                y2={childPos.y}
                stroke="#cbd5e1"
                strokeWidth={2}
              />
            )
          })
        })}

        {/* Nodes */}
        {step.nodes.map((node) => {
          const pos = positions[node.id]
          if (!pos) return null
          return (
            <g key={node.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={getNodeColor(node.id)}
                className="transition-all duration-300"
                stroke={node.id === step.current ? '#d97706' : 'transparent'}
                strokeWidth={3}
              />
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={getTextColor(node.id)}
                fontSize={13}
                fontWeight="bold"
              >
                {node.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
