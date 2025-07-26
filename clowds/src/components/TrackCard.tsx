import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, MoreHorizontal, Clock, Share } from 'lucide-react';
import { Track } from '../types';

interface TrackCardProps {
  track: Track;
  isPlaying?: boolean;
  isLiked?: boolean;
  onPlay?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  index?: number;
  showIndex?: boolean;
  variant?: 'list' | 'grid' | 'compact';
}

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  isPlaying = false,
  isLiked = false,
  onPlay,
  onLike,
  onShare,
  index,
  showIndex = false,
  variant = 'list'
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (variant === 'grid') {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="glass-card p-4 cursor-pointer group"
        onClick={onPlay}
      >
        <div className="relative mb-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-800">
            {track.thumbnail ? (
              <img
                src={track.thumbnail}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Play size={48} className="text-gray-600" />
              </div>
            )}
          </div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              opacity: isPlaying ? 1 : 0,
              scale: isPlaying ? 1 : 0.8 
            }}
            className="absolute bottom-2 right-2 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center green-glow shadow-lg group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onPlay?.();
            }}
          >
            {isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white ml-1" />
            )}
          </motion.button>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-1 truncate">{track.title}</h3>
          <p className="text-gray-400 text-sm truncate">{track.artist}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">{formatDuration(track.duration)}</span>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onLike?.();
                }}
                className={`transition-colors ${
                  isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer group"
        onClick={onPlay}
      >
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
          {track.thumbnail ? (
            <img
              src={track.thumbnail}
              alt={track.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play size={16} className="text-gray-600" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate text-sm">{track.title}</h4>
          <p className="text-gray-400 text-xs truncate">{track.artist}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onPlay?.();
          }}
        >
          {isPlaying ? (
            <Pause size={16} className="text-primary-400" />
          ) : (
            <Play size={16} className="text-gray-400 hover:text-primary-400" />
          )}
        </motion.button>
      </motion.div>
    );
  }

  // Default list variant
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer group"
      onClick={onPlay}
    >
      {showIndex && (
        <div className="w-8 text-center">
          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-primary-400"
            >
              ♪
            </motion.div>
          ) : (
            <span className="text-gray-400 text-sm">{index! + 1}</span>
          )}
        </div>
      )}

      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
        {track.thumbnail ? (
          <img
            src={track.thumbnail}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play size={20} className="text-gray-600" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold truncate">{track.title}</h3>
        <p className="text-gray-400 text-sm truncate">{track.artist}</p>
        {track.album && (
          <p className="text-gray-500 text-xs truncate">{track.album}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onLike?.();
          }}
          className={`transition-colors ${
            isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
          }`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
        </motion.button>

        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <Clock size={16} />
          <span>{formatDuration(track.duration)}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onShare?.();
          }}
          className="text-gray-400 hover:text-primary-400 transition-colors"
        >
          <Share size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <MoreHorizontal size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
          onClick={(e) => {
            e.stopPropagation();
            onPlay?.();
          }}
        >
          {isPlaying ? (
            <Pause size={24} className="text-primary-400" />
          ) : (
            <Play size={24} className="text-gray-400 hover:text-primary-400" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};