import { redirect } from "next/navigation";
import { WatchButton } from "./WatchButton";

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
}

async function getVideoData(videoId: string): Promise<VideoData | null> {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY || !videoId) {
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet,statistics`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const video = data.items[0];
    const thumbnails = video.snippet.thumbnails;

    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail:
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      viewCount: parseInt(video.statistics.viewCount || "0"),
    };
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

export default async function WatchPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const params = await searchParams;
  const videoId = params?.v;

  if (!videoId) {
    redirect("/");
  }

  const video = await getVideoData(videoId);

  if (!video) {
    redirect(`https://www.youtube.com/watch?v=${videoId}`);
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
                <WatchButton videoId={videoId} />

                <a
                  href="/"
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition-all shadow-lg text-center"
                >
                  More Videos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
