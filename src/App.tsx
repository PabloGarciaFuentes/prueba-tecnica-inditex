import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import MainPage, { loader as mainPageLoader } from './pages/MainPage'
import PodcastPage from './pages/PodcastPage'
import EpisodePage from './pages/EpisodePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
        loader: mainPageLoader,
      },
      {
        path: 'podcast/:podcastId',
        element: <PodcastPage />,
      },
      {
        path: 'podcast/:podcastId/episode/:episodeId',
        element: <EpisodePage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
