import { useLoaderData, useParams } from 'react-router-dom'
import type { PodcastDetail } from '../types/podcast.types'
import { apiClient } from '../services/apiClient'
import PodcastSidebar from '../components/PodcastSidebar'

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
      <div className="md:col-span-3 bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col space-y-6">
        {/* Episode Title */}
        <h2 className="text-2xl font-bold text-slate-800 leading-tight">
          {episode.title}
        </h2>

        {/* Episode Description (rendered as HTML, not escaped, italicized like the PDF) */}
        <div 
          dangerouslySetInnerHTML={{ __html: episode.description }}
          className="text-slate-500 italic text-sm leading-relaxed border-b border-slate-100 pb-8 prose max-w-none"
        />

        {/* Native HTML5 Audio Player */}
        <div className="pt-2">
          {episode.audioUrl ? (
            <audio 
              controls 
              className="w-full focus:outline-none"
              src={episode.audioUrl}
            >
              Your browser does not support the audio element.
            </audio>
          ) : (
            <div className="text-center py-4 bg-slate-50 rounded-lg text-slate-400 text-sm">
              No audio stream available for this episode.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
