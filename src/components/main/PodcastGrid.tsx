import type { Podcast } from '../../types/podcast.types'
import PodcastCard from './PodcastCard'

interface PodcastGridProps {
  podcasts: Podcast[]
}

export default function PodcastGrid({ podcasts }: PodcastGridProps) {
  if (podcasts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
        No podcasts match your search.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16 mt-20">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  )
}
