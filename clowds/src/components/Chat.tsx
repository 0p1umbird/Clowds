import React from 'react';
import { motion } from 'framer-motion';
import { Send, Smile, Paperclip, X, MessageCircle } from 'lucide-react';
import { Message, Chat as ChatType } from '../types';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  chat?: ChatType;
}

// Demo messages
const demoMessages: Message[] = [
  {
    id: '1',
    content: 'Hey! Just discovered this amazing track 🎵',
    sender: 'user1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: 'text',
  },
  {
    id: '2',
    content: 'Which one? I\'m always looking for new music!',
    sender: 'user2',
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    type: 'text',
  },
  {
    id: '3',
    content: 'Check out "Blinding Lights" by The Weeknd',
    sender: 'user1',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    type: 'track_share',
    metadata: {
      track: {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        thumbnail: 'https://i.scdn.co/image/ab67616d0000b27329fd6d49b5978ab4cf73b82e'
      }
    }
  },
  {
    id: '4',
    content: 'Love that song! Adding it to my playlist now 💚',
    sender: 'user2',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    type: 'text',
  },
];

export const Chat: React.FC<ChatProps> = ({ isOpen, onClose, chat }) => {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>(demoMessages);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'currentUser',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const MessageBubble = ({ msg }: { msg: Message }) => {
    const isCurrentUser = msg.sender === 'currentUser';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
          isCurrentUser 
            ? 'bg-primary-500 text-white' 
            : 'glass-card text-white'
        }`}>
          {msg.type === 'track_share' && msg.metadata?.track ? (
            <div className="mb-2">
              <div className="flex items-center gap-2 p-2 bg-black/20 rounded-lg">
                <img 
                  src={msg.metadata.track.thumbnail} 
                  alt={msg.metadata.track.title}
                  className="w-10 h-10 rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{msg.metadata.track.title}</p>
                  <p className="text-xs opacity-75 truncate">{msg.metadata.track.artist}</p>
                </div>
              </div>
            </div>
          ) : null}
          <p>{msg.content}</p>
          <p className={`text-xs mt-1 ${
            isCurrentUser ? 'text-primary-100' : 'text-gray-400'
          }`}>
            {formatTime(msg.timestamp)}
          </p>
        </div>
      </motion.div>
    );
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-6 bottom-24 w-80 h-96 glass-card flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <MessageCircle size={20} className="text-primary-400" />
          <div>
            <h3 className="text-white font-medium">General Chat</h3>
            <p className="text-gray-400 text-xs">12 online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                type="button"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Smile size={16} />
              </button>
              <button
                type="button"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Paperclip size={16} />
              </button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!message.trim()}
            className="w-10 h-10 bg-primary-500 hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
          >
            <Send size={16} className="text-white" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};