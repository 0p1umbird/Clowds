export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: string[];
  following: string[];
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  thumbnail?: string;
  url?: string;
  source: 'youtube' | 'soundcloud' | 'local';
  addedBy?: string;
  addedAt?: Date;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: Track[];
  owner: string;
  isPublic: boolean;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  owner: string;
  members: string[];
  currentTrack?: Track;
  queue: Track[];
  isPlaying: boolean;
  currentTime: number;
  isPublic: boolean;
  maxMembers: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  type: 'text' | 'system' | 'track_share';
  metadata?: any;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group' | 'room';
  name?: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayerState {
  currentTrack?: Track;
  queue: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeat: 'none' | 'one' | 'all';
  shuffle: boolean;
  isLoading: boolean;
}

export interface SearchResult {
  tracks: Track[];
  artists: any[];
  albums: any[];
  playlists: Playlist[];
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface NotificationSettings {
  messages: boolean;
  mentions: boolean;
  follows: boolean;
  roomInvites: boolean;
  newTracks: boolean;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  notifications: NotificationSettings;
  autoplay: boolean;
  quality: 'high' | 'medium' | 'low';
  showLyrics: boolean;
}

export interface LyricsData {
  lyrics: string;
  source: 'genius' | 'musixmatch' | 'local';
  isTimestamped: boolean;
  timestamps?: Array<{
    time: number;
    text: string;
  }>;
}

export interface ArtistInfo {
  name: string;
  bio?: string;
  image?: string;
  followers?: number;
  verified?: boolean;
  socialLinks?: {
    spotify?: string;
    youtube?: string;
    soundcloud?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface AlbumInfo {
  title: string;
  artist: string;
  year?: number;
  genre?: string[];
  cover?: string;
  trackCount?: number;
  duration?: number;
  label?: string;
}