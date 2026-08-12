import { useParams } from 'react-router-dom'

export default function EpisodePage() {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Detalle de un Episodio</h2>
      <p className="text-slate-500 mb-4">
        Podcast ID: <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono text-sm">{podcastId}</code> | 
        Episodio ID: <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono text-sm">{episodeId}</code>
      </p>
      <p className="text-slate-500">Aquí se mostrará la descripción y el reproductor de audio para este capítulo.</p>
    </div>
  )
}
