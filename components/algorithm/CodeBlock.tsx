'use client'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('python', python)

interface CodeBlockProps {
  code: string
  title?: string
}

export default function CodeBlock({ code, title }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-800 text-gray-300 text-xs px-4 py-2 font-mono">
          {title}
        </div>
      )}
      <SyntaxHighlighter
        language="python"
        style={oneDark}
        customStyle={{ margin: 0, borderRadius: title ? '0 0 0.5rem 0.5rem' : '0.5rem', fontSize: '0.875rem' }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
