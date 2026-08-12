import { Link, Outlet, useNavigation } from 'react-router-dom'
import { ThinkingOrb } from 'thinking-orbs';

export default function RootLayout() {
  const navigation = useNavigation()
  // React Router v6 sets navigation.state to 'loading' when fetching data via loaders during route transition
  const isLoading = navigation.state === 'loading'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Podcaster
          </Link>

          {/* Loading Indicator */}
          <div className="flex items-center justify-center">
            {isLoading && (
              <div className="flex items-center gap-2">
                <ThinkingOrb 
                  theme="light"
                  state="composing" 
                  size={64} 
                  speed={1.5}
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(27%) sepia(85%) saturate(2462%) hue-rotate(213deg) brightness(97%) contrast(101%)'
                  }}
                />
                <span className="t-shimmer" data-text="Loading…">Loading…</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
