import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Player } from './Player';
import { Chat } from './Chat';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 overflow-hidden">
      {/* Sidebar */}
      <div className="flex-shrink-0 w-64 glass-sidebar">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
        
        {/* Player */}
        <div className="flex-shrink-0 glass-player">
          <Player />
        </div>
      </div>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-32 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center green-glow shadow-xl z-40"
        >
          <MessageCircle size={24} className="text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </motion.button>
      )}

      {/* Chat Component */}
      <Chat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};