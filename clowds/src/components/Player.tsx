import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  Share,
  List,
  Maximize2
} from 'lucide-react';

export const Player: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(75);
  const [isMuted, setIsMuted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isShuffled, setIsShuffled] = React.useState(false);
  const [repeatMode, setRepeatMode] = React.useState<'none' | 'one' | 'all'>('none');

  // Demo track data
  const currentTrack = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    thumbnail: "https://i.scdn.co/image/ab67616d0000b27329fd6d49b5978ab4cf73b82e",
    duration: 200,
    currentTime: 45
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const Waveform = () => (
    <div className="flex items-end gap-1 h-8">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-1 bg-gradient-to-t from-primary-500 to-primary-300 rounded-full ${
            isPlaying ? 'waveform-bar' : ''
          }`}
          style={{ 
            height: isPlaying ? Math.random() * 16 + 8 : 4,
            animationDelay: `${i * 0.1}s`
          }}
          animate={{
            height: isPlaying ? [8, 24, 8] : 4,
            opacity: isPlaying ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{
            duration: 1.5,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="h-24 flex items-center gap-4 px-6 py-4">
      {/* Track Info */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <motion.div 
          className="w-16 h-16 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <img 
            src={currentTrack.thumbnail} 
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="min-w-0 flex-1">
          <h4 className="text-white font-semibold truncate">
            {currentTrack.title}
          </h4>
          <p className="text-gray-400 text-sm truncate">
            {currentTrack.artist}
          </p>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-primary-400 transition-colors"
          >
            <Heart size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-primary-400 transition-colors"
          >
            <Share size={20} />
          </motion.button>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 min-w-0 flex-1 max-w-md">
        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsShuffled(!isShuffled)}
            className={`transition-colors ${
              isShuffled ? 'text-primary-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shuffle size={18} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipBack size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center green-glow hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300"
          >
            {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-1" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipForward size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setRepeatMode(
              repeatMode === 'none' ? 'all' : 
              repeatMode === 'all' ? 'one' : 'none'
            )}
            className={`transition-colors ${
              repeatMode !== 'none' ? 'text-primary-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Repeat size={18} />
            {repeatMode === 'one' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-400 rounded-full" />
            )}
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(currentTrack.currentTime)}
          </span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentTrack.currentTime / currentTrack.duration) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs text-gray-400 w-10">
            {formatTime(currentTrack.duration)}
          </span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center gap-4 min-w-0 flex-1 justify-end">
        <Waveform />
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
          
          <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
              style={{ width: isMuted ? '0%' : `${volume}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-primary-400 transition-colors"
          >
            <List size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-primary-400 transition-colors"
          >
            <Maximize2 size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};