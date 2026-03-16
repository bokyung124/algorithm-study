'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories } from '@/data/categories'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-200 lg:hidden">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-3 overflow-y-auto h-[calc(100vh-60px)] lg:h-[calc(100vh-57px)]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
            알고리즘 유형
          </p>
          <ul className="space-y-0.5">
            {categories.map((cat) => {
              const href = `/category/${cat.id}`
              const isActive = pathname.startsWith(href)
              return (
                <li key={cat.id}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span className="ml-auto text-xs text-gray-400">{cat.patterns.length}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
