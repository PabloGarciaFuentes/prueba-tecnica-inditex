import { Link } from 'react-router-dom'
import type { Podcast } from '../../types/podcast.types'

interface PodcastCardProps {
  podcast: Podcast
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <Link
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
  )
}
