export default  function AudioPlayer({audioRef, link, name, format, seek, current, duration, progress, togglePlay,isPlaying, index}) {
    return (
      <div key={index} className="flex flex-col gap-2 w-full">
        <audio
          ref={(el) => (audioRef.current[index] = el)}
          src={`/naats/${link}.mp3`}
        />

        {/* Title */}
        <div className="text-sm font-semibold">{name}</div>

        {/* Player Row */}
        <div className="flex items-center gap-3 w-full">
          {/* Timestamp */}
          <div className="flex-shrink-0 w-1/4 text-xs text-gray-500">
            {format(current[index])} / {format(duration[index])}
          </div>

          {/* Progress Bar */}
          <div
            onClick={(e) => seek(index, e)}
            className="flex-1 h-3 bg-gray-200 rounded-full cursor-pointer overflow-hidden relative"
          >
            <div
              className="h-full bg-black transition-all"
              style={{ width: `${progress[index] || 0}%` }}
            />
          </div>

          {/* Play/Pause Icon */}
          <button
            onClick={() => togglePlay(index)}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 active:scale-95 transition shadow"
          >
            {isPlaying[index] ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    )
}