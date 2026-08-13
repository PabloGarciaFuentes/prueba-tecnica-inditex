import { useLoaderData } from 'react-router-dom'
import type { PodcastDetail } from '../types/podcast.types'
import { apiClient } from '../services/apiClient'
import PodcastSidebar from '../components/PodcastSidebar'
import EpisodeTable from '../components/EpisodeTable'

export async function loader({ params }: { params: Record<string, string | undefined> }) {
  const { podcastId } = params
  if (!podcastId) {
    throw new Error('Podcast ID is required')
  }
  return await apiClient.getPodcastDetail(podcastId)
}

export default function PodcastPage() {
  const podcastDetail = useLoaderData() as PodcastDetail

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      {/* Sidebar (Left Column) */}
      <div className="md:col-span-1">
        <PodcastSidebar podcast={podcastDetail} />
      </div>

      {/* Main Section (Right Column) */}
      <div className="md:col-span-3 space-y-6">
        {/* Episode Count Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            Episodes: {podcastDetail.episodes.length}
          </h2>
        </div>

        {/* Episodes Table Panel */}
        <EpisodeTable episodes={podcastDetail.episodes} />
      </div>
    </div>
  )
}

