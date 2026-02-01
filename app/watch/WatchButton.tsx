"use client";

export function WatchButton({ videoId }: { videoId: string }) {
  const handleClick = () => {
    window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg"
    >
      Watch on YouTube
    </button>
  );
}
