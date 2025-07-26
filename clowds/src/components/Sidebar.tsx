import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  Library, 
  Heart, 
  MessageCircle, 
  Users, 
  Settings,
  User,
  Radio,
  TrendingUp,
  Plus
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: TrendingUp, label: 'Trending', path: '/trending' },
  { icon: Radio, label: 'Rooms', path: '/rooms' },
];

const libraryItems = [
  { icon: Library, label: 'Your Library', path: '/library' },
  { icon: Heart, label: 'Liked Songs', path: '/liked' },
  { icon: Users, label: 'Following', path: '/following' },
];

const socialItems = [
  { icon: MessageCircle, label: 'Messages', path: '/messages', badge: 3 },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('/');

  const NavItem = ({ 
    icon: Icon, 
    label, 
    path, 
    badge 
  }: { 
    icon: any; 
    label: string; 
    path: string; 
    badge?: number;
  }) => (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveItem(path)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-300 relative ${
        activeItem === path
          ? 'bg-primary-500/20 text-primary-400 green-glow'
          : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      {badge && (
        <span className="ml-auto bg-primary-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
          {badge}
        </span>
      )}
    </motion.button>
  );

  return (
    <div className="h-full flex flex-col p-4">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gradient">Clowds</h1>
        <p className="text-sm text-gray-400">Music & Social</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Discover
          </h3>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
        </div>

        {/* Library */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Your Library
            </h3>
            <button className="text-gray-400 hover:text-primary-400 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-1">
            {libraryItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Social
          </h3>
          <div className="space-y-1">
            {socialItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="mt-6 p-4 glass-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Demo User
            </p>
            <p className="text-xs text-gray-400 truncate">
              demo@clowds.app
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-400">Following</p>
            <p className="text-sm font-semibold text-white">127</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-400">Followers</p>
            <p className="text-sm font-semibold text-white">89</p>
          </div>
        </div>
      </div>
    </div>
  );
};