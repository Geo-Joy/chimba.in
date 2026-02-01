"use client";

export default function Home() {
  const handleOpenChannel = () => {
    // Using the standard YouTube URL - Android will show app chooser
    window.location.href = "https://www.youtube.com/@ChimbanumChimbiyum";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <div className="text-center max-w-md">
        <div className="bg-white rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
          <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">ChimbanumChimbiyum</h1>
        <p className="text-white text-lg mb-8 opacity-90">Kids Entertainment Channel</p>

        <button
          onClick={handleOpenChannel}
          className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg mb-4 w-full"
        >
          Watch on YouTube
        </button>

        <p className="text-white text-sm opacity-75">
          Tap the button above to open in the YouTube app
        </p>
      </div>
    </div>
  );
}
