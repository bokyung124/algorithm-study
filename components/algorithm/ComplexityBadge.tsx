interface ComplexityBadgeProps {
  label: string
  value: string
  variant?: 'time' | 'space'
}

export default function ComplexityBadge({ label, value, variant = 'time' }: ComplexityBadgeProps) {
  const colors = variant === 'time'
    ? 'bg-purple-50 text-purple-700 border-purple-200'
    : 'bg-green-50 text-green-700 border-green-200'

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${colors}`}>
      {label}: <code className="font-mono">{value}</code>
    </span>
  )
}
