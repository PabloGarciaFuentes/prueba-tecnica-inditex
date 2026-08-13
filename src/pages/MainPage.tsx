import { useTransition } from 'react'
import { useLoaderData, Link, useSearchParams } from 'react-router-dom'
import type { Podcast } from '../types/podcast.types'
import { apiClient } from '../services/apiClient'

export async function loader() {
  return await apiClient.getTopPodcasts()
}

export default function MainPage() {
  const allPodcasts = useLoaderData() as Podcast[]
  const [searchParams, setSearchParams] = useSearchParams()
  const filterText = searchParams.get('search') || ''
  const [, startTransition] = useTransition()

  // We update the URL query parameter using React Router state to keep the input responsive
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    startTransition(() => {
      if (value) {
        setSearchParams({ search: value }, { replace: true })
      } else {
        setSearchParams({}, { replace: true })
      }
    })
  }

  // Filter logic: case-insensitive match on title or author
  const filteredPodcasts = allPodcasts.filter((podcast) => {
    const term = filterText.toLowerCase()
    return (
      podcast.title.toLowerCase().includes(term) ||
      podcast.author.toLowerCase().includes(term)
    )
  })

  return (
    <div className="space-y-12">
      {/* Search Bar & Badge Section */}
      <div className="flex justify-end items-center gap-3">
        {/* Count Badge */}
        <span className="bg-blue-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg shadow-sm">
          {filteredPodcasts.length}
        </span>
        {/* Filter Input */}
        <input
          id="podcast-search-filter"
          name="searchFilter"
          type="text"
          value={filterText}
          placeholder="Filter podcasts..."
          aria-label="Filter podcasts by title or author"
          onChange={handleFilterChange}
          className="w-full max-w-xs px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      {/* Podcast Grid */}
      {filteredPodcasts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          No podcasts match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16 mt-20">
          {filteredPodcasts.map((podcast) => (
            <Link
              key={podcast.id}
              to={`/podcast/${podcast.id}`}
              className="bg-white border border-slate-200/80 rounded-xl p-4 pt-16 relative flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
            >
              {/* Overlapping Circular Image */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="font-bold text-slate-800 uppercase text-xs tracking-wide line-clamp-2 min-h-[2rem]">
                {podcast.title}
              </h3>

              {/* Author */}
              <p className="text-slate-400 text-xs mt-2 line-clamp-1">
                Author: <span className="text-slate-600 font-medium">{podcast.author}</span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
