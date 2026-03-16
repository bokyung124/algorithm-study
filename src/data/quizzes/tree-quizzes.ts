import type { QuizQuestion } from '../../types/quiz'

export const treeQuizzes: Record<string, QuizQuestion[]> = {
  'binary-tree-traversal': [
    {
      id: 'tree-q1',
      type: 'output-prediction',
      question: '이진 트리 [1, 2, 3, 4, 5]의 중위 순회(inorder) 결과는?',
      options: ['1→2→4→5→3', '4→2→5→1→3', '4→5→2→3→1', '1→2→3→4→5'],
      answer: '4→2→5→1→3',
      explanation: '중위 순회는 왼쪽→루트→오른쪽 순서로, 4→2→5→1→3입니다.',
    },
    {
      id: 'tree-q2',
      type: 'fill-blank',
      question: '전위 순회는 ___→왼쪽→오른쪽, 후위 순회는 왼쪽→오른쪽→___ 순서이다.',
      answer: '루트, 루트',
      explanation: '전위(preorder): 루트→왼→오, 후위(postorder): 왼→오→루트 순서입니다.',
    },
  ],
  'bst': [
    {
      id: 'bst-q1',
      type: 'complexity-match',
      question: '균형 이진 탐색 트리의 탐색 시간복잡도는?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 'O(log n)',
      explanation: '균형 BST에서 높이가 log n이므로 탐색도 O(log n)입니다.',
    },
    {
      id: 'bst-q2',
      type: 'fill-blank',
      question: 'BST의 중위 순회 결과는 항상 ___ 순서이다.',
      answer: '오름차순',
      explanation: 'BST의 특성(왼쪽 < 루트 < 오른쪽)으로 인해 중위 순회는 오름차순 정렬됩니다.',
    },
  ],
  'tree-dp': [
    {
      id: 'tdp-q1',
      type: 'fill-blank',
      question: '트리 DP는 일반적으로 ___에서 ___로 올라가며 값을 계산한다.',
      answer: '리프, 루트',
      explanation: '리프 노드부터 상위로 올라가며 부분 문제의 결과를 합쳐가는 방식입니다.',
    },
  ],
}
