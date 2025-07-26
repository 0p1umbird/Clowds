# Clowds 🎵✨

A modern social music platform that combines the best of Spotify and Instagram. Discover, share, and enjoy music together with friends in real-time.

![Clowds Banner](https://via.placeholder.com/800x400/0f172a/00FF9D?text=Clowds+-+Social+Music+Platform)

## ✨ Features

### 🌐 General
- **Sleek Dark Glassmorphism UI** with green accent colors (#00FF9D)
- **TailwindCSS + Framer Motion** for beautiful animations
- **Responsive Design** for mobile and desktop
- **TypeScript** for type safety and better development experience

### 👥 Social Features
- **User Accounts** with authentication (placeholder implementation)
- **Follow/Unfollow System** to connect with music lovers
- **Real-time Chat** with emoji support and file sharing
- **Group Chat & Direct Messages** 
- **Shared Music Rooms** for listening together
- **Track Sharing** with embedded previews in chat

### 🎵 Music Core
- **Real-time Music Playback** using YouTube API with rotating keys
- **Advanced Music Search** powered by Last.fm API
- **Lyrics Integration** from Genius API
- **Album/Artist Information** from Discogs + MusicBrainz
- **SoundCloud Support** (optional) for additional content
- **Waveform Visualizations** with animated player controls

### 🎛️ Player Features
- **Mini-player** with full controls
- **Animated Progress Bar** and volume controls
- **Shuffle, Repeat, Queue Management**
- **Waveform Animation** that responds to playback
- **Keyboard Shortcuts** for quick control

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS with custom glassmorphism components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks + Context (ready for Redux/Zustand)
- **Real-time**: Socket.io (placeholder implementation)

## 📦 API Integrations

### YouTube API
- **5 Rotating Keys** for high availability
- **Automatic Key Rotation** when quota limits are hit
- **Fallback Responses** when all keys are exhausted

### Music Data APIs
- **Genius API**: Lyrics and song information
- **Discogs API**: Album artwork and metadata  
- **MusicBrainz**: Artist information and discography
- **Last.fm**: Music discovery and recommendations
- **SoundCloud API**: Additional music content (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/clowds.git
   cd clowds
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your API keys:
   ```env
   # YouTube API Keys (comma-separated for rotation)
   REACT_APP_YOUTUBE_API_KEYS=key1,key2,key3,key4,key5
   
   # Genius API
   REACT_APP_GENIUS_CLIENT_ID=your_genius_client_id
   REACT_APP_GENIUS_API_KEY=your_genius_api_key
   
   # Discogs API
   REACT_APP_DISCOGS_CONSUMER_KEY=your_discogs_key
   REACT_APP_DISCOGS_CONSUMER_SECRET=your_discogs_secret
   
   # Add other API keys as needed
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Design System

### Colors
- **Primary Green**: `#00FF9D` - Main accent color
- **Dark Background**: Gradient from `#0f0f0f` to `#1a1a1a` with green tints
- **Glass Elements**: Semi-transparent overlays with backdrop blur

### Components
- **Glass Cards**: `glass-card` class for consistent styling
- **Green Glow Effects**: `green-glow` and `green-glow-hover` for accents
- **Button Variants**: `button-primary` and `button-secondary`
- **Text Gradients**: `text-gradient` for brand elements

### Animations
- **Fade In**: Smooth opacity transitions
- **Slide Up**: Content reveal animations  
- **Pulse Glow**: Breathing effect for active elements
- **Waveform**: Real-time audio visualization

## 📁 Project Structure

```
src/
├── api/              # API integration modules
│   ├── youtube.ts    # YouTube API with key rotation
│   ├── genius.ts     # Genius lyrics API
│   ├── lastfm.ts     # Last.fm music data
│   └── discogs.ts    # Discogs album info
├── components/       # Reusable UI components
│   ├── Layout.tsx    # Main app layout
│   ├── Sidebar.tsx   # Navigation sidebar
│   ├── Player.tsx    # Music player controls
│   ├── TrackCard.tsx # Track display component
│   └── Chat.tsx      # Real-time chat
├── hooks/           # Custom React hooks
│   ├── usePlayer.ts  # Player state management
│   ├── useAuth.ts    # Authentication logic
│   └── useAPI.ts     # API request handling
├── lib/             # Utility libraries
│   └── rotateApiKeys.ts # API key rotation logic
├── pages/           # Page components
│   ├── Home.tsx      # Dashboard/home feed
│   ├── Search.tsx    # Music search
│   ├── Profile.tsx   # User profiles
│   └── Rooms.tsx     # Shared listening rooms
├── types/           # TypeScript definitions
│   └── index.ts      # All type definitions
└── utils/           # Helper functions
    └── formatters.ts # Time, text formatting
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier

## 🎯 Current Status

✅ **Completed**
- Basic UI scaffolding with glassmorphism design
- Sidebar navigation with user profile
- Music player with waveform animations
- Track cards with multiple display variants
- Real-time chat interface
- API key rotation system
- Home page with featured content
- TailwindCSS configuration and theming

🚧 **In Progress**
- YouTube API integration
- Search functionality
- User authentication system
- Socket.io real-time features

📋 **Planned Features**
- Playlist management
- Social features (follow/unfollow)
- Music rooms with synchronized playback
- Mobile responsive improvements
- PWA support
- Backend API development

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern music streaming platforms
- **UI Components**: TailwindCSS community
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion community examples

## 📞 Support

Having issues? Check out our [documentation](docs/) or create an issue on GitHub.

---

**Built with ❤️ by the Clowds team**

*Bringing people together through music* 🎵
