import { useTransition } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import type { Podcast } from '../types/podcast.types'
import { apiClient } from '../services/apiClient'
import PodcastSearch from '../components/PodcastSearch'
import PodcastGrid from '../components/PodcastGrid'

export async function loader() {
  return await apiClient.getTopPodcasts()
}

export default function MainPage() {
  const allPodcasts = useLoaderData() as Podcast[]
  const [searchParams, setSearchParams] = useSearchParams()
  const filterText = searchParams.get('search') || ''
  const [, startTransition] = useTransition()

  // Synchronize the search bar with the URL query parameters in a background transition
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
      <PodcastSearch 
        value={filterText} 
        count={filteredPodcasts.length} 
        onChange={handleFilterChange} 
      />

      <PodcastGrid podcasts={filteredPodcasts} />
    </div>
  )
}

