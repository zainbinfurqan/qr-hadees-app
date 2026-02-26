'use client'
import { useEffect, useRef, useState } from 'react'
import AudioPlayer from "../components/audio"
import { naat } from "../constants/constants"



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
    <div className="w-96 m-auto flex flex-col gap-6 p-3">
      <a href="/" className="flex">
        <span aria-hidden="true" className="mr-1">
          ←
        </span>
        <p className="text-right text-sm ">Home</p>
      </a>
      {naat.map((naat, index) => (
        <div key={index}>
          <AudioPlayer
            audioRef={audioRefs}
            link={naat.link}
            name={naat.name}
            format={format}
            seek={seek}
            current={current}
            duration={duration}
            progress={progress}
            togglePlay={togglePlay}
            isPlaying={isPlaying}
            inde={index}
          />
          <div className=" border-top border-[0.01vw] border-gray-100" />
        </div>
      ))}
    </div>
  )
}
