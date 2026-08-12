import type { Podcast, PodcastDetail, Episode } from '../types/podcast.types'
import type { iTunesFeedResponse, iTunesLookupResponse, iTunesEpisodeResult, iTunesPodcastResult } from '../types/api.types'
import { cacheService } from './cacheService'

const TOP_PODCASTS_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
const LOOKUP_BASE_URL = 'https://itunes.apple.com/lookup'

const CACHE_KEY_TOP_PODCASTS = 'top-podcasts'
const CACHE_KEY_PODCAST_DETAIL_PREFIX = 'podcast-detail-'

// Helper to make JSONP requests since iTunes API supports JSONP natively
function fetchJsonp<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_callback_${Math.round(Math.random() * 1000000)}`
    
    ;(window as any)[callbackName] = (data: T) => {
      cleanup()
      resolve(data)
    }

    const script = document.createElement('script')
    const separator = url.includes('?') ? '&' : '?'
    script.src = `${url}${separator}callback=${callbackName}`
    script.async = true

    script.onerror = () => {
      cleanup()
      reject(new Error(`JSONP request failed for ${url}`))
    }

    function cleanup() {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      delete (window as any)[callbackName]
    }

    document.head.appendChild(script)
  })
}

// Resilient fetching wrapper: Try JSONP first, fallback to direct, then to proxy
async function fetchWithFallback<T>(url: string): Promise<T> {
  try {
    // 1. Try JSONP directly (immune to CORS, fast, and natively supported by iTunes)
    return await fetchJsonp<T>(url)
  } catch (e) {
    console.warn(`JSONP fetch failed for ${url}, trying direct fetch:`, e)
  }

  try {
    // 2. Try direct fetch (just in case)
    const response = await fetch(url)
    if (response.ok) {
      return await response.json()
    }
  } catch (e) {
    console.warn(`Direct fetch failed for ${url}, trying proxy:`, e)
  }

  // 3. Last resort: Fallback to AllOrigins proxy
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
  const response = await fetch(proxyUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch from proxy: ${response.statusText}`)
  }
  const json = await response.json()
  return JSON.parse(json.contents) as T
}

export const apiClient = {
  async getTopPodcasts(): Promise<Podcast[]> {
    // 1. Check cache
    const cached = cacheService.get<Podcast[]>(CACHE_KEY_TOP_PODCASTS)
    if (cached) return cached

    // 2. Fetch data (with fallback pipeline)
    const rawData = await fetchWithFallback<iTunesFeedResponse>(TOP_PODCASTS_URL)

    // 3. Map to Domain model
    const entries = rawData.feed.entry || []
    const podcasts: Podcast[] = entries.map((entry) => {
      const images = entry['im:image'] || []
      const image = images[images.length - 1]?.label || ''

      return {
        id: entry.id.attributes['im:id'],
        title: entry['im:name'].label,
        author: entry['im:artist'].label,
        image,
        description: entry.summary?.label || '',
      }
    })

    // 4. Set cache
    cacheService.set(CACHE_KEY_TOP_PODCASTS, podcasts)
    return podcasts
  },

  async getPodcastDetail(podcastId: string): Promise<PodcastDetail> {
    const cacheKey = `${CACHE_KEY_PODCAST_DETAIL_PREFIX}${podcastId}`

    // 1. Check cache
    const cached = cacheService.get<PodcastDetail>(cacheKey)
    if (cached) return cached

    // 2. Fetch data (with fallback pipeline)
    const targetUrl = `${LOOKUP_BASE_URL}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
    const rawData = await fetchWithFallback<iTunesLookupResponse>(targetUrl)
    const results = rawData.results || []

    if (results.length === 0) {
      throw new Error(`No details found for podcast: ${podcastId}`)
    }

    // 3. The first result is the podcast channel
    const podcastResult = results[0] as iTunesPodcastResult
    const image = podcastResult.artworkUrl600 || podcastResult.artworkUrl100 || ''

    // 4. Find the description (only available in the top feed entries)
    let description = ''
    const cachedTopPodcasts = cacheService.get<Podcast[]>(CACHE_KEY_TOP_PODCASTS)
    if (cachedTopPodcasts) {
      const match = cachedTopPodcasts.find((p) => p.id === podcastId)
      if (match) {
        description = match.description
      }
    }

    // Fallback: If not in cache, fetch the feed to extract description
    if (!description) {
      try {
        const topPodcasts = await this.getTopPodcasts()
        const match = topPodcasts.find((p) => p.id === podcastId)
        if (match) {
          description = match.description
        }
      } catch (e) {
        console.error('Failed to fetch description from top feed:', e)
      }
    }

    // 5. Subsequent results are the episodes
    const episodes: Episode[] = results.slice(1).map((res) => {
      const ep = res as iTunesEpisodeResult
      return {
        id: String(ep.trackId),
        title: ep.trackName,
        description: ep.description || '',
        date: ep.releaseDate,
        duration: ep.trackTimeMillis || 0,
        audioUrl: ep.episodeUrl || '',
      }
    })

    const detail: PodcastDetail = {
      id: String(podcastResult.collectionId),
      title: podcastResult.trackName,
      author: podcastResult.artistName,
      image,
      description,
      episodes,
    }

    // 6. Set cache
    cacheService.set(cacheKey, detail)
    return detail
  },
}
