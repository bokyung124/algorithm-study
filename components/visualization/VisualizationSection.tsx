'use client'

import { useState, useMemo } from 'react'
import { getVisualization } from '@/data/visualizations'
import VisualizationPlayer from './VisualizationPlayer'

interface Props {
  categoryId: string
  patternId: string
}

export default function VisualizationSection({ categoryId, patternId }: Props) {
  const config = getVisualization(categoryId, patternId)
  const [inputText, setInputText] = useState('')
  const [key, setKey] = useState(0)

  if (!config) return null

  const isArrayViz = Array.isArray(config.defaultInput)

  const input = useMemo(() => {
    if (!isArrayViz) return config.defaultInput
    if (!inputText.trim()) return config.defaultInput
    const nums = inputText.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n))
    return nums.length > 1 ? nums : config.defaultInput
  }, [inputText, config.defaultInput, isArrayViz])

  const steps = useMemo(() => config.generateSteps(input), [config, input])

  const handleApply = () => {
    setKey((k) => k + 1)
  }

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">시각화</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        {isArrayViz && (
          <div className="flex items-center gap-2 mb-4">
            <label className="text-xs text-gray-500 shrink-0">입력 배열:</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={(config.defaultInput as number[]).join(', ')}
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-blue-300"
            />
            <button
              onClick={handleApply}
              className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors"
            >
              적용
            </button>
          </div>
        )}
        <VisualizationPlayer key={key} steps={steps} />
      </div>
    </section>
  )
}
