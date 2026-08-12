import { useLoaderData, Link } from 'react-router-dom'
import type { PodcastDetail } from '../types/podcast.types'
import { apiClient } from '../services/apiClient'
import PodcastSidebar from '../components/PodcastSidebar'
import { formatDate } from '../utils/dateFormatter'
import { formatDuration } from '../utils/durationFormatter'

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

        {/* Episode Table Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-700 text-sm font-bold">
                  <th className="pb-3 pr-4 font-bold">Title</th>
                  <th className="pb-3 px-4 font-bold w-32">Date</th>
                  <th className="pb-3 pl-4 font-bold w-24 text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {podcastDetail.episodes.map((episode, idx) => (
                  <tr 
                    key={episode.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      idx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                    }`}
                  >
                    {/* Title Link */}
                    <td className="py-3.5 pr-4 font-medium max-w-md truncate">
                      <Link 
                        to={`episode/${episode.id}`}
                        className="text-blue-600 hover:text-blue-700 hover:underline transition-colors block"
                      >
                        {episode.title}
                      </Link>
                    </td>
                    {/* Publication Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                      {formatDate(episode.date)}
                    </td>
                    {/* Duration */}
                    <td className="py-3.5 pl-4 whitespace-nowrap text-slate-500 text-right">
                      {formatDuration(episode.duration)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {podcastDetail.episodes.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              No episodes found for this podcast.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
