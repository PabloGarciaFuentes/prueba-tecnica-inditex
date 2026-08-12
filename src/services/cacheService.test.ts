// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cacheService } from './cacheService'

describe('cacheService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  it('should store and retrieve data correctly within 24 hours', () => {
    const key = 'test-key'
    const testData = { name: 'Podcast test', id: 123 }

    cacheService.set(key, testData)
    const retrieved = cacheService.get(key)

    expect(retrieved).toEqual(testData)
  })

  it('should return null and remove item if it is older than 24 hours', () => {
    const key = 'expire-key'
    const testData = 'some-cached-string'

    cacheService.set(key, testData)

    // Advance time by 24 hours + 1 millisecond
    const ONE_DAY_MS = 24 * 60 * 60 * 1000
    vi.advanceTimersByTime(ONE_DAY_MS + 1)

    const retrieved = cacheService.get(key)
    expect(retrieved).toBeNull()
    expect(localStorage.getItem(key)).toBeNull()
  })
})
