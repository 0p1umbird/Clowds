import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, Play, Zap } from 'lucide-react';
import { TrackCard } from '../components/TrackCard';
import { Track } from '../types';

// Demo data
const featuredTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b27329fd6d49b5978ab4cf73b82e',
    source: 'youtube',
    addedAt: new Date(),
  },
  {
    id: '2',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273be841ba4bc24340152e3a79a',
    source: 'youtube',
    addedAt: new Date(),
  },
  {
    id: '3',
    title: 'Bad Habits',
    artist: 'Ed Sheeran',
    duration: 231,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2735a35a7484e4edc0a1c6932e5',
    source: 'youtube',
    addedAt: new Date(),
  },
  {
    id: '4',
    title: 'Industry Baby',
    artist: 'Lil Nas X ft. Jack Harlow',
    duration: 212,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273be82e44cc9a7d4ad8e5b063a',
    source: 'youtube',
    addedAt: new Date(),
  },
];

const recentlyPlayed: Track[] = [
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    duration: 142,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273fd8d7a8d96871e791cb1f626',
    source: 'youtube',
    addedAt: new Date(),
  },
  {
    id: '6',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    duration: 178,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a',
    source: 'youtube',
    addedAt: new Date(),
  },
];

const quickStats = [
  { icon: TrendingUp, label: 'Trending Now', value: '2.3M', color: 'text-green-400' },
  { icon: Users, label: 'Active Users', value: '45K', color: 'text-blue-400' },
  { icon: Clock, label: 'Hours Played', value: '12.8M', color: 'text-purple-400' },
  { icon: Zap, label: 'New Releases', value: '1.2K', color: 'text-yellow-400' },
];

export const Home: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState<string | null>(null);

  const handlePlay = (trackId: string) => {
    setCurrentlyPlaying(currentlyPlaying === trackId ? null : trackId);
  };

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="glass-card p-6 text-center"
    >
      <Icon className={`w-8 h-8 mx-auto mb-3 ${color}`} />
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to <span className="text-gradient">Clowds</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover, share, and enjoy music together. Connect with friends and explore new sounds in our social music platform.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {quickStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>

      {/* Featured Tracks */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Today</h2>
          <button className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              variant="grid"
              isPlaying={currentlyPlaying === track.id}
              onPlay={() => handlePlay(track.id)}
            />
          ))}
        </div>
      </motion.section>

      {/* Recently Played */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recently Played</h2>
          <button className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
            View History
          </button>
        </div>
        
        <div className="glass-card p-6">
          {recentlyPlayed.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track}
              variant="list"
              showIndex
              index={index}
              isPlaying={currentlyPlaying === track.id}
              onPlay={() => handlePlay(track.id)}
            />
          ))}
        </div>
      </motion.section>

      {/* Action Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-card p-8 text-center bg-gradient-to-br from-primary-500/20 to-primary-600/20 border-primary-500/30"
        >
          <Play className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Create Room</h3>
          <p className="text-gray-400 mb-4">
            Start a listening party and invite friends to enjoy music together in real-time.
          </p>
          <button className="button-primary">
            Create Room
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-card p-8 text-center"
        >
          <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Join Community</h3>
          <p className="text-gray-400 mb-4">
            Connect with music lovers, share your favorite tracks, and discover new artists.
          </p>
          <button className="button-secondary">
            Explore Community
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};