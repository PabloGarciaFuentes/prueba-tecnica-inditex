interface CacheData<T> {
  data: T
  timestamp: number
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000 // 24 hours

export const cacheService = {
  set<T>(key: string, data: T): void {
    const cacheEntry: CacheData<T> = {
      data,
      timestamp: Date.now(),
    }
    try {
      localStorage.setItem(key, JSON.stringify(cacheEntry))
    } catch (e) {
      console.error('Error writing to localStorage cache:', e)
    }
  },

  get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(key)
      if (!cached) return null

      const { data, timestamp }: CacheData<T> = JSON.parse(cached)
      const age = Date.now() - timestamp

      if (age > ONE_DAY_MS) {
        localStorage.removeItem(key)
        return null
      }

      return data
    } catch (e) {
      console.error('Error reading from localStorage cache:', e)
      return null
    }
  },
}
