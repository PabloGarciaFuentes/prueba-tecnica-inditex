import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from '../components/Header'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Encapsulated Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      {/* Global Scroll Restoration */}
      <ScrollRestoration />
    </div>
  )
}

