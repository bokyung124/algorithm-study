import { complexityData } from '../data/complexity-reference'
import { essentialTips } from '../data/essential-tips'

export default function ReferencePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">코딩테스트 레퍼런스</h1>

      {/* Time Complexity Table */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">시간복잡도 비교표</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">복잡도</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">명칭</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">N=10⁶일 때</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">예시</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complexityData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-mono text-purple-700">{row.notation}</td>
                  <td className="px-4 py-2.5 text-gray-700">{row.name}</td>
                  <td className="px-4 py-2.5 text-gray-500">{row.estimation}</td>
                  <td className="px-4 py-2.5 text-gray-500">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Input Size Guide */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">입력 크기별 허용 복잡도 (1초 기준)</h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">N 범위</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">허용 복잡도</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-4 py-2.5">N ≤ 10</td><td className="px-4 py-2.5 font-mono text-sm">O(N!)</td></tr>
              <tr><td className="px-4 py-2.5">N ≤ 20</td><td className="px-4 py-2.5 font-mono text-sm">O(2^N)</td></tr>
              <tr><td className="px-4 py-2.5">N ≤ 500</td><td className="px-4 py-2.5 font-mono text-sm">O(N³)</td></tr>
              <tr><td className="px-4 py-2.5">N ≤ 5,000</td><td className="px-4 py-2.5 font-mono text-sm">O(N²)</td></tr>
              <tr><td className="px-4 py-2.5">N ≤ 100,000</td><td className="px-4 py-2.5 font-mono text-sm">O(N log N)</td></tr>
              <tr><td className="px-4 py-2.5">N ≤ 10,000,000</td><td className="px-4 py-2.5 font-mono text-sm">O(N)</td></tr>
              <tr><td className="px-4 py-2.5">그 이상</td><td className="px-4 py-2.5 font-mono text-sm">O(log N) 또는 O(1)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Essential Tips */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">코딩테스트 필수 지식</h2>
        <div className="space-y-4">
          {essentialTips.map((section, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
