"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
}

function WatchVideo() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("v");
  const [video, setVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) {
      window.location.href = "https://www.chimba.in/";
      return;
    }

    // Fetch video details
    fetch(`/api/video/${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // Redirect to YouTube if we can't fetch details
          window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
        } else {
          setVideo(data);
          setLoading(false);

          // Auto redirect to YouTube after 2 seconds
          setTimeout(() => {
            window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
          }, 2000);
        }
      })
      .catch(() => {
        window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
      });
  }, [videoId]);

  const handleWatchNow = () => {
    window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
  };

  if (loading || !video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
          {/* Video Thumbnail */}
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              {video.title}
            </h1>

            <div className="flex items-center gap-4 mb-4 text-gray-600">
              <span>{video.channelTitle}</span>
              <span>•</span>
              <span>{video.viewCount.toLocaleString()} views</span>
            </div>

            <p className="text-gray-700 mb-6 line-clamp-3">
              {video.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWatchNow}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg"
              >
                Watch on YouTube
              </button>

              <a
                href="/"
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition-all shadow-lg text-center"
              >
                More Videos
              </a>
            </div>

            <p className="text-gray-500 text-sm text-center mt-4">
              Redirecting to YouTube in a few seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading video...</p>
        </div>
      </div>
    }>
      <WatchVideo />
    </Suspense>
  );
}
