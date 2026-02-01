import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const videoId = params?.v;

  if (!videoId) {
    return {
      title: "Watch Video - Chimba.in",
      description: "ChimbanumChimbiyum Kids Entertainment Channel",
    };
  }

  try {
    // Fetch video details for meta tags
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet,statistics`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch video");
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error("Video not found");
    }

    const video = data.items[0];
    const thumbnails = video.snippet.thumbnails;
    const thumbnail =
      thumbnails.maxres?.url ||
      thumbnails.standard?.url ||
      thumbnails.high?.url ||
      thumbnails.medium?.url;

    const title = `${video.snippet.title} - ChimbanumChimbiyum`;
    const description =
      video.snippet.description.substring(0, 155) || "Watch this video from ChimbanumChimbiyum Kids Entertainment Channel";
    const url = `https://www.chimba.in/watch?v=${videoId}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: "Chimba.in - ChimbanumChimbiyum",
        images: [
          {
            url: thumbnail,
            width: 1280,
            height: 720,
            alt: video.snippet.title,
          },
        ],
        type: "video.other",
        videos: [
          {
            url: `https://www.youtube.com/watch?v=${videoId}`,
          },
        ],
      },
      twitter: {
        card: "player",
        title,
        description,
        images: [thumbnail],
        players: {
          playerUrl: `https://www.youtube.com/embed/${videoId}`,
          streamUrl: `https://www.youtube.com/watch?v=${videoId}`,
          width: 1280,
          height: 720,
        },
      },
      other: {
        "og:video": `https://www.youtube.com/watch?v=${videoId}`,
        "og:video:secure_url": `https://www.youtube.com/watch?v=${videoId}`,
        "og:video:type": "text/html",
        "og:video:width": "1280",
        "og:video:height": "720",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Watch Video - Chimba.in",
      description: "ChimbanumChimbiyum Kids Entertainment Channel",
    };
  }
}

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
