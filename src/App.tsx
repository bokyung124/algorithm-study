import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import PatternPage from './pages/PatternPage'
import MemosPage from './pages/MemosPage'
import ReferencePage from './pages/ReferencePage'
import ReviewPage from './pages/ReviewPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="category/:categoryId/:patternId" element={<PatternPage />} />
          <Route path="memos" element={<MemosPage />} />
          <Route path="reference" element={<ReferencePage />} />
          <Route path="review" element={<ReviewPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
