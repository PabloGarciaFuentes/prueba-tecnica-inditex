import React from 'react'

interface PodcastSearchProps {
  value: string
  count: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PodcastSearch({ value, count, onChange }: PodcastSearchProps) {
  return (
    <div className="flex justify-end items-center gap-3">
      {/* Count Badge */}
      <span className="bg-blue-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg shadow-sm">
        {count}
      </span>
      
      {/* Filter Input */}
      <input
        id="podcast-search-filter"
        name="searchFilter"
        type="text"
        value={value}
        placeholder="Filter podcasts..."
        aria-label="Filter podcasts by title or author"
        onChange={onChange}
        className="w-full max-w-xs px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
      />
    </div>
  )
}
