'use client'
import { useEffect, useRef, useState } from 'react'

const naat = [
  {
    name: 'Faslon Ko Takalf Hum Se Ho Agr',
    link: 'faslon_ko_taqallu_Hai_hum_se_agr_Slowed_and_Reverb_KLICKAUD',
  },
  {
    name: 'Lamyate Nazeerok Nee',
    link: 'Lamyate_Nazeerok_NeeMP3_160Kmp3_KLICKAUD',
  },
  {
    name: 'Sahar Ka Waqt Tha',
    link: 'Sahar_ka_waqt_tha_masoom_kaliyan_muskurati_thi___Naat_KLICKAUD',
  },
]

export default function NaatPlayer() {
  const audioRefs = useRef([])

  const [isPlaying, setIsPlaying] = useState([])
  const [progress, setProgress] = useState([])
  const [current, setCurrent] = useState([])
  const [duration, setDuration] = useState([])

  // ✅ Reset state arrays whenever naats length changes
  useEffect(() => {
    setIsPlaying(Array(naat.length).fill(false))
    setProgress(Array(naat.length).fill(0))
    setCurrent(Array(naat.length).fill(0))
    setDuration(Array(naat.length).fill(0))
  }, [naat.length])

  // ✅ Attach listeners dynamically
  useEffect(() => {
    const cleanups = []

    naat.forEach((_, i) => {
      const audio = audioRefs.current[i]
      if (!audio) return

      const onTime = () => {
        setCurrent((p) => {
          const n = [...p]
          n[i] = audio.currentTime
          return n
        })

        setProgress((p) => {
          const n = [...p]
          n[i] = (audio.currentTime / audio.duration) * 100 || 0
          return n
        })
      }

      const onLoaded = () => {
        setDuration((p) => {
          const n = [...p]
          n[i] = audio.duration || 0
          return n
        })
      }

      audio.addEventListener('timeupdate', onTime)
      audio.addEventListener('loadedmetadata', onLoaded)

      cleanups.push(() => {
        audio.removeEventListener('timeupdate', onTime)
        audio.removeEventListener('loadedmetadata', onLoaded)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [naat])

  // ✅ Play toggle (only one plays)
  const togglePlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (!audio) return

      if (i === index) {
        if (audio.paused) audio.play()
        else audio.pause()
      } else {
        audio.pause()
      }
    })

    setIsPlaying((p) => p.map((_, i) => (i === index ? !p[i] : false)))
  }

  // ✅ Seek
  const seek = (index, e) => {
    const audio = audioRefs.current[index]
    if (!audio) return

    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    audio.currentTime = percent * audio.duration
  }

  const format = (t) => {
    if (!t) return '0:00'
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="flex flex-col gap-6 p-3">
      <a href="/" className="flex">
        <span aria-hidden="true" className="mr-1">
          ←
        </span>
        <p className="text-right text-sm ">Home</p>
      </a>
      {naat.map((naat, index) => (
        <>
          <div key={index} className="flex flex-col gap-2 w-full">
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={`/naats/${naat.link}.mp3`}
            />

            {/* Title */}
            <div className="text-sm font-semibold">{naat.name}</div>

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
          <div className=" border-top border-[0.01vw] border-gray-100" />
        </>
      ))}
    </div>
  )
}
