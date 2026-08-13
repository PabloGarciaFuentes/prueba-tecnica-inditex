import { Link } from 'react-router-dom'
import LoadingIndicator from './LoadingIndicator'

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Podcaster
        </Link>

        {/* Loading Indicator Container */}
        <div className="flex items-center justify-center">
          <LoadingIndicator />
        </div>
      </div>
    </header>
  )
}
