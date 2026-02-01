# Chimba.in

A Next.js website for the ChimbanumChimbiyum YouTube channel. Displays latest and trending videos dynamically from YouTube. On mobile devices, it opens videos in the native YouTube app for a better user experience.

## Features

- **Dynamic Video Feed**: Fetches latest and trending videos from YouTube Data API
- **Mobile App Deep Linking**: Opens YouTube app on mobile devices
- **Responsive Design**: Beautiful UI that works on all devices
- **Server-Side Caching**: Videos are cached for 1 hour for better performance
- **Modern Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS

## Setup

### 1. Get YouTube API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key
5. Get your YouTube Channel ID:
   - Go to your YouTube channel
   - Click on your profile picture > Settings > Advanced settings
   - Copy your Channel ID (starts with "UC...")
   - OR use a tool like [Comment Picker](https://commentpicker.com/youtube-channel-id.php) to find it from your channel URL

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxx
```

Replace the values with your actual API key and channel ID.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building

Build the production version:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Deploy to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   - Click "Environment Variables"
   - Add `YOUTUBE_API_KEY` with your API key
   - Add `YOUTUBE_CHANNEL_ID` with your channel ID
6. Click "Deploy"

### Using Vercel CLI

Install Vercel CLI:
```bash
npm install -g vercel
```

Deploy:
```bash
vercel
```

For production:
```bash
vercel --prod
```

## Project Structure

```
chimba.in/
├── app/
│   ├── api/
│   │   └── videos/
│   │       └── route.ts    # API route to fetch YouTube videos
│   ├── layout.tsx          # Root layout with meta tags
│   ├── page.tsx            # Home page with video gallery
│   └── globals.css         # Global styles with Tailwind
├── .env.local              # Environment variables (not in git)
├── package.json
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

## How It Works

1. **API Route** (`/api/videos`): Server-side API route that:
   - Fetches latest videos from YouTube Data API
   - Gets video statistics (views, likes)
   - Sorts videos by views to find trending content
   - Caches results for 1 hour to reduce API calls

2. **Frontend** (`/app/page.tsx`): Client-side React component that:
   - Fetches videos from the API route
   - Displays latest video in a featured section
   - Shows top 2 trending videos in a grid
   - Opens videos in YouTube app on mobile when clicked

3. **Deep Linking**: Uses standard YouTube URLs with App Link meta tags to ensure mobile devices prompt to open the YouTube app

## API Rate Limits

YouTube Data API has a daily quota limit of 10,000 units per day (free tier). Each API call costs:
- Search request: 100 units
- Video details request: 1 unit

With caching enabled (1 hour), you should stay well within limits for a personal site.

## Future Enhancements

Potential features to add:
- Show all channel videos with pagination
- Search functionality
- Video categories/playlists
- Channel statistics (subscriber count, total views)
- Comments section
- Newsletter subscription

## License

MIT
