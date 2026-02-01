"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const channelUrl = "https://www.youtube.com/@ChimbanumChimbiyum";
    const youtubeAppUrl = "vnd.youtube://www.youtube.com/@ChimbanumChimbiyum";

    if (isMobile) {
      // Try to open in native YouTube app first
      window.location.href = youtubeAppUrl;

      // Fallback to web URL after a short delay if app doesn't open
      setTimeout(() => {
        window.location.href = channelUrl;
      }, 1500);
    } else {
      // Desktop: redirect to YouTube web
      window.location.href = channelUrl;
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Chimba.in</h1>

        <div className="inline-block">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        </div>

        <p className="text-white text-lg mb-4">
          Redirecting to ChimbanumChimbiyum YouTube channel...
        </p>

        <a
          href="https://www.youtube.com/@ChimbanumChimbiyum"
          className="text-white underline hover:text-gray-200 transition-colors"
        >
          Click here if not redirected automatically
        </a>
      </div>
    </div>
  );
}
