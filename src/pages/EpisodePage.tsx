import { useLoaderData, useParams } from 'react-router-dom'
import type { PodcastDetail } from '../types/podcast.types'
import { apiClient } from '../services/apiClient'
import PodcastSidebar from '../components/common/PodcastSidebar'
import EpisodeDetail from '../components/episode/EpisodeDetail'

export async function loader({ params }: { params: Record<string, string | undefined> }) {
  const { podcastId } = params
  if (!podcastId) {
    throw new Error('Podcast ID is required')
  }
  return await apiClient.getPodcastDetail(podcastId)
}

export default function EpisodePage() {
  const { episodeId } = useParams<{ episodeId: string }>()
  const podcastDetail = useLoaderData() as PodcastDetail

  // Find the specific episode in the details
  const episode = podcastDetail.episodes.find((ep) => ep.id === episodeId)

  if (!episode) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        <div className="md:col-span-1">
          <PodcastSidebar podcast={podcastDetail} />
        </div>
        <div className="md:col-span-3 bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
          Episode not found.
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      {/* Sidebar (Left Column) */}
      <div className="md:col-span-1">
        <PodcastSidebar podcast={podcastDetail} />
      </div>

      {/* Main Section (Right Column) */}
      <EpisodeDetail episode={episode} />
    </div>
  )
}

