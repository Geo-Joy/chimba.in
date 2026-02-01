import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const { id: videoId } = await params;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  if (!videoId) {
    return NextResponse.json({ error: "Video ID required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet,statistics`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("YouTube API error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch video" },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const video = data.items[0];
    const thumbnails = video.snippet.thumbnails;

    const videoData = {
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
      likeCount: parseInt(video.statistics.likeCount || "0"),
    };

    return NextResponse.json(videoData, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}
