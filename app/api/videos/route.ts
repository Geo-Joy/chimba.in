import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!API_KEY || !CHANNEL_ID) {
    return NextResponse.json(
      { error: "API key or Channel ID not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch channel statistics
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${CHANNEL_ID}&part=statistics,snippet`,
      { next: { revalidate: 3600 } }
    );

    if (!channelResponse.ok) {
      const errorData = await channelResponse.json();
      console.error("YouTube Channel API error:", errorData);
      throw new Error(`YouTube Channel API error: ${JSON.stringify(errorData)}`);
    }

    const channelData = await channelResponse.json();
    const channelStats = channelData.items[0]?.statistics;

    // Fetch latest videos from the channel
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("YouTube API error:", errorData);
      throw new Error(`YouTube API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    // Get video statistics to find trending videos
    const videoIds = data.items.map((item: any) => item.id.videoId).join(",");

    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=statistics,snippet`,
      { next: { revalidate: 3600 } }
    );

    if (!statsResponse.ok) {
      const errorData = await statsResponse.json();
      console.error("YouTube Stats API error:", errorData);
      throw new Error(`YouTube Stats API error: ${JSON.stringify(errorData)}`);
    }

    const statsData = await statsResponse.json();

    // Format the data with highest quality thumbnails
    const videos = statsData.items.map((item: any) => {
      // Use maxres (1280x720) if available, fallback to standard (640x480) or high (480x360)
      const thumbnails = item.snippet.thumbnails;
      const thumbnail =
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url;

      return {
        id: item.id,
        title: item.snippet.title,
        thumbnail,
        publishedAt: item.snippet.publishedAt,
        viewCount: parseInt(item.statistics.viewCount || "0"),
        likeCount: parseInt(item.statistics.likeCount || "0"),
      };
    });

    // Get latest video (most recent)
    const latest = videos[0];

    // Get trending videos (sorted by view count)
    const trending = [...videos]
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 2);

    return NextResponse.json({
      latest,
      trending,
      allVideos: videos,
      channelStats: {
        subscriberCount: parseInt(channelStats?.subscriberCount || "0"),
        viewCount: parseInt(channelStats?.viewCount || "0"),
        videoCount: parseInt(channelStats?.videoCount || "0"),
      },
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
