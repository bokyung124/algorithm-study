import type { TableVisualizationStep } from '@/types/visualization'

interface Props {
  step: TableVisualizationStep
}

export default function TableVisualization({ step }: Props) {
  const isFilled = (row: number, col: number) =>
    step.filledCells?.some(([r, c]) => r === row && c === col) ?? false

  const isHighlight = (row: number, col: number) =>
    step.highlightCell?.[0] === row && step.highlightCell?.[1] === col

  return (
    <div className="flex flex-col items-center overflow-x-auto w-full">
      <table className="border-collapse">
        <thead>
          <tr>
            {step.headers.map((h, i) => (
              <th
                key={i}
                className="text-xs font-semibold text-gray-600 px-3 py-1.5 border border-gray-200 bg-gray-50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {step.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`text-sm text-center px-3 py-2 border border-gray-200 font-mono transition-all duration-300 ${
                    isHighlight(ri, ci)
                      ? 'bg-amber-200 font-bold text-amber-800'
                      : isFilled(ri, ci)
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-white text-gray-400'
                  }`}
                >
                  {cell === null || cell === undefined ? '-' : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
