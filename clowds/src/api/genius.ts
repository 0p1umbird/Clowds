import { LyricsData, ApiError } from '../types';
import { createFallbackResponse } from '../lib/rotateApiKeys';

const GENIUS_BASE_URL = 'https://api.genius.com';
const GENIUS_API_KEY = process.env.REACT_APP_GENIUS_API_KEY;

interface GeniusSearchResponse {
  response: {
    hits: Array<{
      result: {
        id: number;
        title: string;
        primary_artist: {
          name: string;
        };
        url: string;
        song_art_image_url?: string;
        lyrics_state: string;
      };
    }>;
  };
}

interface GeniusSongResponse {
  response: {
    song: {
      id: number;
      title: string;
      primary_artist: {
        name: string;
      };
      url: string;
      song_art_image_url?: string;
      lyrics_state: string;
      description?: {
        plain?: string;
      };
    };
  };
}

// Search for songs on Genius
export async function searchGenius(query: string): Promise<any[]> {
  if (!GENIUS_API_KEY) {
    console.warn('Genius API key not configured');
    return createFallbackResponse([], 'Genius API not configured');
  }

  try {
    const url = `${GENIUS_BASE_URL}/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GENIUS_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Genius API error: ${response.status} ${response.statusText}`);
    }

    const data: GeniusSearchResponse = await response.json();
    
    return data.response.hits.map(hit => ({
      id: hit.result.id,
      title: hit.result.title,
      artist: hit.result.primary_artist.name,
      url: hit.result.url,
      artwork: hit.result.song_art_image_url,
      hasLyrics: hit.result.lyrics_state === 'complete',
    }));
  } catch (error) {
    console.error('Genius search failed:', error);
    return createFallbackResponse([], 'Genius search temporarily unavailable');
  }
}

// Get song details by ID
export async function getGeniusSong(songId: number): Promise<any | null> {
  if (!GENIUS_API_KEY) {
    console.warn('Genius API key not configured');
    return null;
  }

  try {
    const url = `${GENIUS_BASE_URL}/songs/${songId}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GENIUS_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Genius API error: ${response.status} ${response.statusText}`);
    }

    const data: GeniusSongResponse = await response.json();
    const song = data.response.song;
    
    return {
      id: song.id,
      title: song.title,
      artist: song.primary_artist.name,
      url: song.url,
      artwork: song.song_art_image_url,
      hasLyrics: song.lyrics_state === 'complete',
      description: song.description?.plain,
    };
  } catch (error) {
    console.error('Genius song fetch failed:', error);
    return null;
  }
}

// Find best match for a track
export async function findBestMatch(title: string, artist: string): Promise<any | null> {
  const query = `${title} ${artist}`;
  const results = await searchGenius(query);
  
  if (results.length === 0) return null;
  
  // Simple scoring system to find best match
  const scoredResults = results.map(result => {
    let score = 0;
    
    // Title similarity (case insensitive)
    const titleSimilarity = calculateSimilarity(
      title.toLowerCase(),
      result.title.toLowerCase()
    );
    score += titleSimilarity * 0.6;
    
    // Artist similarity
    const artistSimilarity = calculateSimilarity(
      artist.toLowerCase(),
      result.artist.toLowerCase()
    );
    score += artistSimilarity * 0.4;
    
    return { ...result, score };
  });
  
  // Sort by score and return best match
  scoredResults.sort((a, b) => b.score - a.score);
  return scoredResults[0].score > 0.5 ? scoredResults[0] : null;
}

// Get lyrics for a track (requires web scraping due to Genius API limitations)
export async function getLyrics(title: string, artist: string): Promise<LyricsData | null> {
  try {
    const match = await findBestMatch(title, artist);
    if (!match || !match.hasLyrics) {
      return createFallbackResponse(null, 'Lyrics not found');
    }
    
    // Note: Due to Genius API limitations, actual lyrics retrieval would require
    // web scraping or a third-party service. For now, return a placeholder.
    return {
      lyrics: 'Lyrics are available on Genius.com\n\nClick the link below to view full lyrics.',
      source: 'genius',
      isTimestamped: false,
    };
  } catch (error) {
    console.error('Lyrics fetch failed:', error);
    return null;
  }
}

// Alternative lyrics source (placeholder for additional services)
export async function getLyricsFromAlternativeSource(title: string, artist: string): Promise<LyricsData | null> {
  // Placeholder for additional lyrics services like Musixmatch, AZLyrics, etc.
  try {
    // This would implement other lyrics APIs
    return {
      lyrics: `Looking for lyrics for "${title}" by ${artist}...\n\nLyrics service temporarily unavailable.`,
      source: 'local',
      isTimestamped: false,
    };
  } catch (error) {
    console.error('Alternative lyrics source failed:', error);
    return null;
  }
}

// Simple string similarity calculation (Jaro-Winkler approximation)
function calculateSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  
  const len1 = str1.length;
  const len2 = str2.length;
  
  if (len1 === 0 || len2 === 0) return 0;
  
  const matchWindow = Math.floor(Math.max(len1, len2) / 2) - 1;
  const matches1 = new Array(len1).fill(false);
  const matches2 = new Array(len2).fill(false);
  
  let matches = 0;
  let transpositions = 0;
  
  // Find matches
  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, len2);
    
    for (let j = start; j < end; j++) {
      if (matches2[j] || str1[i] !== str2[j]) continue;
      matches1[i] = matches2[j] = true;
      matches++;
      break;
    }
  }
  
  if (matches === 0) return 0;
  
  // Count transpositions
  let k = 0;
  for (let i = 0; i < len1; i++) {
    if (!matches1[i]) continue;
    while (!matches2[k]) k++;
    if (str1[i] !== str2[k]) transpositions++;
    k++;
  }
  
  const jaro = (matches / len1 + matches / len2 + (matches - transpositions / 2) / matches) / 3;
  
  // Jaro-Winkler prefix bonus
  let prefix = 0;
  for (let i = 0; i < Math.min(len1, len2, 4); i++) {
    if (str1[i] === str2[i]) prefix++;
    else break;
  }
  
  return jaro + (0.1 * prefix * (1 - jaro));
}