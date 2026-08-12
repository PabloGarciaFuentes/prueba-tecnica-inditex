import { useParams } from 'react-router-dom'

export default function PodcastPage() {
  const { podcastId } = useParams<{ podcastId: string }>()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Detalle de un Podcast</h2>
      <p className="text-slate-500 mb-4">
        Mostrando la información detallada para el podcast con ID: <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono text-sm">{podcastId}</code>.
      </p>
      <p className="text-slate-500">Aquí se mostrará el número de capítulos y el listado de episodios correspondientes.</p>
    </div>
  )
}
