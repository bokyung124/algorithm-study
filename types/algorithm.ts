export interface CodeExample {
  title: string
  code: string
  explanation: string
}

export interface Tool {
  name: string
  description: string
  import: string
}


export interface Problem {
  name: string
  platform: 'leetcode' | 'boj' | 'programmers'
  id: string
  slug?: string
  difficulty?: string
}

export interface Pattern {
  id: string
  name: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  keyInsight: string
  tools: Tool[]
  codeExamples: CodeExample[]
  commonProblems: Problem[]
  tips: string[]
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  patterns: Pattern[]
  subject?: 'algorithm' | 'sql'
  toolsLabel?: string
}
