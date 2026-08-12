import { Link } from 'react-router-dom'
import type { Podcast } from '../types/podcast.types'

interface PodcastSidebarProps {
  podcast: Podcast
}

export default function PodcastSidebar({ podcast }: PodcastSidebarProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col space-y-6">
      {/* Podcast Image */}
      <div className="flex justify-center">
        <Link 
          to={`/podcast/${podcast.id}`} 
          className="w-48 h-48 rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:scale-[1.02] transition-transform duration-200"
        >
          <img
            src={podcast.image}
            alt={podcast.title}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <hr className="border-slate-100" />

      {/* Podcast Title & Author */}
      <div className="space-y-1">
        <Link 
          to={`/podcast/${podcast.id}`} 
          className="font-bold text-slate-800 text-base hover:text-blue-600 transition-colors block line-clamp-2"
        >
          {podcast.title}
        </Link>
        <span className="text-slate-500 italic text-sm block">
          by {podcast.author}
        </span>
      </div>

      <hr className="border-slate-100" />

      {/* Podcast Description */}
      <div className="space-y-2">
        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">
          Description:
        </h4>
        <p className="text-slate-500 italic text-sm leading-relaxed whitespace-pre-line">
          {podcast.description || 'No description available.'}
        </p>
      </div>
    </div>
  )
}
