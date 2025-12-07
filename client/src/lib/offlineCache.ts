const CACHE_KEY_PREFIX = "medichain_cache_";
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;

interface CachedData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export function cachePatientData<T>(key: string, data: T): void {
  try {
    const cacheEntry: CachedData<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + CACHE_EXPIRY_MS,
    };
    localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(cacheEntry));
  } catch (error) {
    console.error("Failed to cache data:", error);
  }
}

export function getCachedPatientData<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (!cached) return null;

    const cacheEntry: CachedData<T> = JSON.parse(cached);
    
    if (Date.now() > cacheEntry.expiresAt) {
      localStorage.removeItem(CACHE_KEY_PREFIX + key);
      return null;
    }

    return cacheEntry.data;
  } catch (error) {
    console.error("Failed to retrieve cached data:", error);
    return null;
  }
}

export function clearPatientCache(key?: string): void {
  try {
    if (key) {
      localStorage.removeItem(CACHE_KEY_PREFIX + key);
    } else {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(CACHE_KEY_PREFIX))
        .forEach((k) => localStorage.removeItem(k));
    }
  } catch (error) {
    console.error("Failed to clear cache:", error);
  }
}

export function isCacheValid(key: string): boolean {
  try {
    const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (!cached) return false;

    const cacheEntry = JSON.parse(cached);
    return Date.now() < cacheEntry.expiresAt;
  } catch {
    return false;
  }
}

export function getCacheTimestamp(key: string): Date | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (!cached) return null;

    const cacheEntry = JSON.parse(cached);
    return new Date(cacheEntry.timestamp);
  } catch {
    return null;
  }
}
