import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface HeaderProps {
  onToggleSidebar: () => void
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          aria-label="메뉴 토글"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          Algorithm Study
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/review" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
          복습
        </Link>
        <Link to="/reference" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
          레퍼런스
        </Link>
        <Link to="/memos" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
          내 메모
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 hidden sm:inline">{user?.email}</span>
          <button
            onClick={signOut}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 hover:bg-gray-100 rounded-lg"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  )
}
