'use client'

import { useEffect, useState, useRef } from 'react'
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../helpers/localStorage'
import { books } from '../constants/constants'
import { Hadith } from '../components/Hadees/index'
import { shareImage, sharePDF } from '../helpers/share'
import { setPageMeta } from '../helpers/pageMeta'

export default function AnotherPage() {
  const [hadees, setHadees] = useState<any>(null)
  const [totalDonations, setTotalDonations] = useState<number>(0)
  const [hadithReadCount, setHadithReadCount] = useState<number>(0)
  const [linkToHadith, setLinkToHadith] = useState<string>('')
  const [lastHadithRead, setLastHadithRead] = useState<string>('')
  const [remainingTime, setRemainingTime] = useState<string>('')
  const [scans, setScans] = useState([])
  const ref = useRef(null)

  useEffect(() => {
    setPageMeta({ title: 'Hadith', content: 'Hadith displaying page.' })

    const storedTime =
      getLocalStorageItem('last_hadith_read') ||
      getLocalStorageItem('hadith_read_count')
    if (storedTime) {
      const ts =
        typeof storedTime === 'string'
          ? Date.parse(storedTime)
          : Number(storedTime)
      if (!isNaN(ts) && ts <= Date.now()) {
        // time is equal or greater than now -> reset read count to 0
        setLocalStorageItem('hadith_read_count', 0)
        setHadithReadCount(0)
      }
    }
  }, [])

  useEffect(() => {
    const postDonation = async () => {
      await fetch('/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 0.1,
        }),
      })
    }
    const count = getLocalStorageItem('hadith_read_count') || '0'
    if (parseInt(count) >= 0 && parseInt(count) < 3) {
      setLocalStorageItem('hadith_read_count', parseInt(count) + 1)
      setLocalStorageItem(
        'last_hadith_read',
        new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString()
      )
      postDonation()
      fetchHadees()
    } else {
      setHadithReadCount(parseInt(count))
      setLastHadithRead(getLocalStorageItem('last_hadith_read') || '')
    }
  }, [])

  useEffect(() => {
    hadees &&
      setLinkToHadith(
        `https://sunnah.com/${books[hadees?.metadata.name as keyof typeof books]}:${hadees?.hadiths[0].hadithnumber}`
      )
  }, [hadees])

  useEffect(() => {
    fetch('/api/donation')
      .then((res) => res.json())
      .then(setScans)
  }, [])

  useEffect(() => {
    const total = scans.reduce((sum, scan: any) => sum + (scan?.amount || 0), 0)
    setTotalDonations(total)
  }, [scans])

  useEffect(() => {
    if (!lastHadithRead) return
    const interval = setInterval(() => {
      const nextTime = new Date(lastHadithRead).getTime()
      const now = new Date().getTime()
      const diff = nextTime - now

      if (diff <= 0) {
        setRemainingTime('Ready! You can read a new hadith now.')
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setRemainingTime(`${hours}h ${minutes}m ${seconds}s remaining`)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [lastHadithRead])

  async function fetchHadees() {
    try {
      const res = await fetch('/api/random-hadees')
      const data = await res.json()
      setHadees(data.text)
    } catch (err) {
      console.error(err)
    }
  }

  const handleShareImage = async () => {
    shareImage(ref)
  }

  const handleSharePDF = async () => {
    sharePDF(ref)
  }

  return (
    <>
      {hadithReadCount > 0 && (
        <p className="text-center rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black font-semibold text-blue-600">
          {remainingTime}
        </p>
      )}
      <Hadith
        handleShareImage={handleShareImage}
        handleSharePDF={handleSharePDF}
        hadees={hadees}
        linkToAuthenticateHadith={linkToHadith}
        totalDonations={totalDonations}
        ref={ref}
        urduTranslation={null}
      />
    </>
  )
}
