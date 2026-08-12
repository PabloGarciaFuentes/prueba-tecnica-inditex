export interface iTunesEntry {
  id: {
    attributes: {
      'im:id': string
    }
  }
  'im:name': {
    label: string
  }
  'im:artist': {
    label: string
  }
  'im:image': Array<{
    label: string
    attributes: {
      height: string
    }
  }>
  summary: {
    label: string
  }
}

export interface iTunesFeedResponse {
  feed: {
    entry: iTunesEntry[]
  }
}

export interface iTunesPodcastResult {
  wrapperType: 'track' | 'collection'
  kind: 'podcast'
  artistName: string
  trackName: string
  artworkUrl600?: string
  artworkUrl100?: string
  artworkUrl30?: string
  collectionId: number
  feedUrl: string
}

export interface iTunesEpisodeResult {
  wrapperType: 'podcastEpisode'
  trackId: number
  trackName: string
  description?: string
  releaseDate: string
  trackTimeMillis?: number
  episodeUrl?: string
}

export type iTunesLookupResult = iTunesPodcastResult | iTunesEpisodeResult

export interface iTunesLookupResponse {
  resultCount: number
  results: iTunesLookupResult[]
}
