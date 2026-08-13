import { Link } from 'react-router-dom'
import type { Episode } from '../types/podcast.types'
import { formatDate } from '../utils/dateFormatter'
import { formatDuration } from '../utils/durationFormatter'

interface EpisodeTableProps {
  episodes: Episode[]
}

export default function EpisodeTable({ episodes }: EpisodeTableProps) {
  if (episodes.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400 text-sm bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        No episodes found for this podcast.
      </div>
    )
  }

  return (
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
            {episodes.map((episode, idx) => (
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
    </div>
  )
}
