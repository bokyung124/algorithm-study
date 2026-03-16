import { useState, useEffect, useRef, useCallback } from 'react'
import type { VisualizationStep } from '../../types/visualization'
import ArrayVisualization from './ArrayVisualization'
import GraphVisualization from './GraphVisualization'

interface Props {
  steps: VisualizationStep[]
}

export default function VisualizationPlayer({ steps }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const step = steps[currentStep]

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      clearTimer()
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 800 / speed)
    } else {
      clearTimer()
    }
    return clearTimer
  }, [isPlaying, speed, steps.length, clearTimer])

  const reset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  return (
    <div>
      {/* Visualization area */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 flex justify-center min-h-[250px] items-center">
        {step.type === 'array' ? (
          <ArrayVisualization step={step} />
        ) : (
          <GraphVisualization step={step} />
        )}
      </div>

      {/* Step message */}
      <div className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mb-3 min-h-[40px] flex items-center">
        {step.message}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={reset}
          className="text-xs px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          ⏮ 처음
        </button>
        <button
          onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
          disabled={currentStep === 0}
          className="text-xs px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-40"
        >
          ◀ 이전
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium"
        >
          {isPlaying ? '⏸ 일시정지' : '▶ 재생'}
        </button>
        <button
          onClick={() => setCurrentStep((p) => Math.min(steps.length - 1, p + 1))}
          disabled={currentStep >= steps.length - 1}
          className="text-xs px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-40"
        >
          다음 ▶
        </button>

        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-gray-500">속도:</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                speed === s
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-400 rounded-full transition-all duration-200"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 shrink-0">
          {currentStep + 1} / {steps.length}
        </span>
      </div>
    </div>
  )
}
