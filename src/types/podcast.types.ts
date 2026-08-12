export interface Podcast {
  id: string
  title: string
  author: string
  image: string
  description: string
}

export interface Episode {
  id: string
  title: string
  description: string
  date: string       // ISO / Formatted string
  duration: number   // Milliseconds or formatted
  audioUrl: string
}

export interface PodcastDetail extends Podcast {
  episodes: Episode[]
}
