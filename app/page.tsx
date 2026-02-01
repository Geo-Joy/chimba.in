"use client";

import { useEffect, useState } from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
  publishedAt: string;
}

interface ChannelStats {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

interface VideosData {
  latest: Video;
  trending: Video[];
  channelStats: ChannelStats;
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

  const handleShare = async (videoId: string, videoTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `https://www.chimba.in/watch?v=${videoId}`;

    // Try native share API first (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: videoTitle,
          text: `Watch "${videoTitle}" on ChimbanumChimbiyum`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or error, fall back to clipboard
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      // Final fallback: Show the URL
      prompt("Copy this link:", shareUrl);
    }
  };

  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  const formatNumber = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
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
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg flex-shrink-0">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  ChimbanumChimbiyum
                </h1>
                <p className="text-white/80 text-xs sm:text-sm">Kids Entertainment</p>
              </div>
            </div>
            <button
              onClick={handleOpenChannel}
              className="bg-red-600 text-white px-6 py-2.5 sm:py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              Subscribe
            </button>
          </div>

          {/* Channel Stats */}
          {!loading && videos?.channelStats && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {formatNumber(videos.channelStats.subscriberCount)}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70">Subscribers</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {formatNumber(videos.channelStats.viewCount)}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70">Total Views</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {videos.channelStats.videoCount}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70">Videos</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : videos ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Latest Video */}
            {videos.latest && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Latest Video
                </h2>
                <div
                  onClick={() => handleOpenVideo(videos.latest.id)}
                  className="bg-white rounded-xl overflow-hidden shadow-2xl cursor-pointer transform active:scale-[0.98] sm:hover:scale-[1.02] transition-all"
                >
                  <div className="relative">
                    <img
                      src={videos.latest.thumbnail}
                      alt={videos.latest.title}
                      className="w-full aspect-video object-cover"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/20 active:bg-black/10 sm:hover:bg-black/10 transition-all flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-3 sm:p-4 transform active:scale-110 sm:hover:scale-110 transition-transform">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex-1">
                        {videos.latest.title}
                      </h3>
                      <button
                        onClick={(e) => handleShare(videos.latest.id, videos.latest.title, e)}
                        className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        title="Share video"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">
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
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Trending Videos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {videos.trending.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => handleOpenVideo(video.id)}
                      className="bg-white rounded-xl overflow-hidden shadow-xl cursor-pointer transform active:scale-[0.98] sm:hover:scale-[1.02] transition-all"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full aspect-video object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-black/20 active:bg-black/10 sm:hover:bg-black/10 transition-all flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-2 sm:p-3 transform active:scale-110 sm:hover:scale-110 transition-transform">
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-2 flex-1">
                            {video.title}
                          </h3>
                          <button
                            onClick={(e) => handleShare(video.id, video.title, e)}
                            className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                            title="Share video"
                          >
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
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
          <div className="text-center text-white py-12 px-4">
            <p className="text-lg sm:text-xl mb-4">Unable to load videos</p>
            <button
              onClick={handleOpenChannel}
              className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg text-sm sm:text-base"
            >
              Visit Channel on YouTube
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
