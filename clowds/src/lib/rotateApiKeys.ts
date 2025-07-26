class ApiKeyRotator {
  private keys: string[];
  private currentIndex: number = 0;
  private failedKeys: Set<string> = new Set();
  private lastRotation: number = Date.now();
  private rotationCooldown: number = 5 * 60 * 1000; // 5 minutes

  constructor(keys: string[]) {
    this.keys = keys.filter(key => key.trim() !== '');
    if (this.keys.length === 0) {
      throw new Error('No valid API keys provided');
    }
  }

  getCurrentKey(): string {
    // If all keys have failed, reset the failed set after cooldown
    if (this.failedKeys.size === this.keys.length) {
      const now = Date.now();
      if (now - this.lastRotation > this.rotationCooldown) {
        this.failedKeys.clear();
        this.lastRotation = now;
        console.log('Resetting failed API keys after cooldown period');
      }
    }

    // Find next available key
    let attempts = 0;
    while (attempts < this.keys.length) {
      const key = this.keys[this.currentIndex];
      if (!this.failedKeys.has(key)) {
        return key;
      }
      this.currentIndex = (this.currentIndex + 1) % this.keys.length;
      attempts++;
    }

    // If no keys available, return the current one anyway (last resort)
    return this.keys[this.currentIndex];
  }

  markKeyAsFailed(key: string, error?: any): void {
    console.warn(`API key failed: ${key.substring(0, 10)}...`, error?.message || error);
    this.failedKeys.add(key);
    this.rotate();
  }

  rotate(): void {
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    console.log(`Rotated to key index: ${this.currentIndex}`);
  }

  getStats(): { total: number; failed: number; current: number } {
    return {
      total: this.keys.length,
      failed: this.failedKeys.size,
      current: this.currentIndex
    };
  }

  resetFailedKeys(): void {
    this.failedKeys.clear();
    this.lastRotation = Date.now();
    console.log('Manually reset all failed API keys');
  }
}

// YouTube API Key Rotator
const youtubeKeys = process.env.REACT_APP_YOUTUBE_API_KEYS?.split(',') || [];
export const youtubeKeyRotator = new ApiKeyRotator(youtubeKeys);

// Helper function to handle API requests with automatic key rotation
export async function makeApiRequest<T>(
  requestFn: (apiKey: string) => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const apiKey = youtubeKeyRotator.getCurrentKey();
    
    try {
      const result = await requestFn(apiKey);
      return result;
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a quota/permission error (403) or invalid key (400)
      if (error?.response?.status === 403 || error?.response?.status === 400) {
        youtubeKeyRotator.markKeyAsFailed(apiKey, error);
        
        // If all keys are exhausted, wait before trying again
        const stats = youtubeKeyRotator.getStats();
        if (stats.failed >= stats.total) {
          console.warn('All API keys exhausted, waiting before retry...');
          await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
        }
      } else {
        // For non-key related errors, don't mark key as failed
        throw error;
      }
    }
  }
  
  throw lastError;
}

// Fallback function when all APIs fail
export function createFallbackResponse<T>(defaultValue: T, message: string = 'Service temporarily unavailable'): T {
  console.warn(`Using fallback response: ${message}`);
  return defaultValue;
}