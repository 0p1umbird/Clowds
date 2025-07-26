import { Track, ApiError } from '../types';
import { makeApiRequest, createFallbackResponse } from '../lib/rotateApiKeys';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

interface YouTubeSearchResponse {
  items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      channelTitle: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
      publishedAt: string;
    };
  }>;
}

interface YouTubeVideoResponse {
  items: Array<{
    id: string;
    snippet: {
      title: string;
      channelTitle: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
    contentDetails: {
      duration: string; // ISO 8601 format like "PT4M13S"
    };
  }>;
}

// Convert ISO 8601 duration to seconds
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  return hours * 3600 + minutes * 60 + seconds;
}

// Search for videos on YouTube
export async function searchYouTube(query: string, maxResults: number = 25): Promise<Track[]> {
  try {
    const result = await makeApiRequest(async (apiKey: string) => {
      const url = `${YOUTUBE_BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json() as YouTubeSearchResponse;
    });

    // Get video IDs to fetch duration
    const videoIds = result.items.map(item => item.id.videoId);
    const videoDetails = await getVideoDetails(videoIds);

    return result.items.map((item, index): Track => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: videoDetails[index]?.duration || 0,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      source: 'youtube',
      addedAt: new Date(),
    }));
  } catch (error) {
    console.error('YouTube search failed:', error);
    return createFallbackResponse([], 'YouTube search temporarily unavailable');
  }
}

// Get video details including duration
export async function getVideoDetails(videoIds: string[]): Promise<Array<{ duration: number }>> {
  if (videoIds.length === 0) return [];

  try {
    const result = await makeApiRequest(async (apiKey: string) => {
      const ids = videoIds.join(',');
      const url = `${YOUTUBE_BASE_URL}/videos?part=contentDetails&id=${ids}&key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json() as YouTubeVideoResponse;
    });

    return result.items.map(item => ({
      duration: parseDuration(item.contentDetails.duration)
    }));
  } catch (error) {
    console.error('YouTube video details failed:', error);
    return videoIds.map(() => ({ duration: 0 }));
  }
}

// Get video info by ID
export async function getVideoById(videoId: string): Promise<Track | null> {
  try {
    const result = await makeApiRequest(async (apiKey: string) => {
      const url = `${YOUTUBE_BASE_URL}/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json() as YouTubeVideoResponse;
    });

    if (result.items.length === 0) return null;

    const item = result.items[0];
    return {
      id: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: parseDuration(item.contentDetails.duration),
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      source: 'youtube',
      addedAt: new Date(),
    };
  } catch (error) {
    console.error('YouTube video fetch failed:', error);
    return null;
  }
}

// Get trending videos
export async function getTrendingVideos(maxResults: number = 25): Promise<Track[]> {
  try {
    const result = await makeApiRequest(async (apiKey: string) => {
      const url = `${YOUTUBE_BASE_URL}/videos?part=snippet,contentDetails&chart=mostPopular&videoCategoryId=10&maxResults=${maxResults}&key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json() as YouTubeVideoResponse;
    });

    return result.items.map((item): Track => ({
      id: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: parseDuration(item.contentDetails.duration),
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      source: 'youtube',
      addedAt: new Date(),
    }));
  } catch (error) {
    console.error('YouTube trending failed:', error);
    return createFallbackResponse([], 'YouTube trending temporarily unavailable');
  }
}

// Extract video ID from YouTube URL
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}