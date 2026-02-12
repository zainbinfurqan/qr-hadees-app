"use client";
import { useEffect, useRef, useState } from "react";

const naat=[
    {name:'Faslon Ko Takalf Hum Se Ho Agr', link: 'faslon_ko_taqallu_Hai_hum_se_agr_Slowed_and_Reverb_KLICKAUD'},
    {name:'Lamyate Nazeerok Nee', link: 'Lamyate_Nazeerok_NeeMP3_160Kmp3_KLICKAUD'},
]

export default function NaatPlayer() {
   // Refs for all audio elements
  const audioRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(Array(naat.length).fill(false));
  const [progress, setProgress] = useState(Array(naat.length).fill(0));
  const [currentTime, setCurrentTime] = useState(Array(naat.length).fill(0));
  const [durations, setDurations] = useState(Array(naat.length).fill(0));

  // Initialize event listeners for progress tracking
  useEffect(() => {
    naat.forEach((_, index) => {
      const audio = audioRefs.current[index];
      if (!audio) return;

      const updateTime = () => {
        setCurrentTime((prev) => {
          const newArr = [...prev];
          newArr[index] = audio.currentTime;
          return newArr;
        });
        setProgress((prev) => {
          const newArr = [...prev];
          newArr[index] = (audio.currentTime / audio.duration) * 100 || 0;
          return newArr;
        });
      };

      const loaded = () => {
        setDurations((prev) => {
          const newArr = [...prev];
          newArr[index] = audio.duration;
          return newArr;
        });
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", loaded);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", loaded);
      };
    });
  }, [naat]);

  const togglePlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (i === index) {
        if (isPlaying[i]) audio.pause();
        else audio.play();
      } else {
        audio.pause();
      }
    });

    setIsPlaying((prev) =>
      prev.map((_, i) => (i === index ? !prev[i] : false))
    );
  };

  const seek = (index, e) => {
    const audio = audioRefs.current[index];
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  const format = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

return (
    <div className="flex flex-col gap-6 p-3">
      {naat.map((naat, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
          <audio ref={(el) => (audioRefs.current[index] = el)} src={`/naats/${naat.link}.mp3`} />

          {/* Title */}
          <div className="text-sm font-semibold">{naat.name}</div>

          {/* Player Row */}
          <div className="flex items-center gap-3 w-full">
            {/* Timestamp */}
            <div className="flex-shrink-0 w-1/4 text-xs text-gray-500">
              {format(currentTime[index])} / {format(durations[index])}
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
      ))}
    </div>
  );
}