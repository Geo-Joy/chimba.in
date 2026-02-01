"use client";

import { useEffect, useState } from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
  publishedAt: string;
}

interface VideosData {
  latest: Video;
  trending: Video[];
}

export default function Home() {
  const [videos, setVideos] = useState<VideosData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  }, []);

  const handleOpenChannel = () => {
    window.location.href = "https://www.youtube.com/@ChimbanumChimbiyum";
  };

  const handleOpenVideo = (videoId: string) => {
    window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
  };

  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  ChimbanumChimbiyum
                </h1>
                <p className="text-white/80 text-sm">Kids Entertainment</p>
              </div>
            </div>
            <button
              onClick={handleOpenChannel}
              className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : videos ? (
          <div className="space-y-8">
            {/* Latest Video */}
            {videos.latest && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Latest Video
                </h2>
                <div
                  onClick={() => handleOpenVideo(videos.latest.id)}
                  className="bg-white rounded-xl overflow-hidden shadow-2xl cursor-pointer transform hover:scale-[1.02] transition-all"
                >
                  <div className="relative">
                    <img
                      src={videos.latest.thumbnail}
                      alt={videos.latest.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-4 transform hover:scale-110 transition-transform">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {videos.latest.title}
                    </h3>
                    <p className="text-gray-600">
                      {formatViews(videos.latest.viewCount)} •{" "}
                      {formatDate(videos.latest.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Trending Videos */}
            {videos.trending && videos.trending.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Trending Videos
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {videos.trending.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => handleOpenVideo(video.id)}
                      className="bg-white rounded-xl overflow-hidden shadow-xl cursor-pointer transform hover:scale-[1.02] transition-all"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-3 transform hover:scale-110 transition-transform">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatViews(video.viewCount)} •{" "}
                          {formatDate(video.publishedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-white py-12">
            <p className="text-xl mb-4">Unable to load videos</p>
            <button
              onClick={handleOpenChannel}
              className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg"
            >
              Visit Channel on YouTube
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
