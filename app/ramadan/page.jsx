'use client'
import { useEffect, useState, useRef } from 'react'
import { books, editions } from '../constants/constants'
import { shareImage, sharePDF } from '../helpers/share'
import { Hadith } from '../components/Hadees/index'
import { ramadan_hadees } from '../constants/constants'
import { setPageMeta } from '../helpers/pageMeta'

export default function Page() {
  const [hadees, setHadees] = useState(null)
  const [urduTranslation, setUrduTranslation] = useState(null)
  const [linkToHadith, setLinkToHadith] = useState('')
  const ref = useRef()

  useEffect(() => {
    hadees &&
      setLinkToHadith(
        `https://sunnah.com/${books[hadees?.metadata.name]}:${hadees?.hadiths[0].hadithnumber}`
      )
  }, [hadees])

  const randBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  useEffect(() => {
    setPageMeta({
      title: 'Ramadan Hadees',
      content:
        'Ramadan Hadees App - Read random authentic hadees during Ramadan with Urdu translation.',
    })
  }, [])

  function getRandomRamadanHadeesRef() {
    const edition = editions[Math.floor(Math.random() * editions.length)]
    const ranges = ramadan_hadees[edition]
    if (!ranges) return null

    let chosenRange

    if (Array.isArray(ranges[0])) {
      chosenRange = ranges[Math.floor(Math.random() * ranges.length)]
    } else {
      chosenRange = ranges
    }

    const number = randBetween(chosenRange[0], chosenRange[1])

    return { edition, number }
  }

  async function fetchHadees() {
    try {
      const ref = getRandomRamadanHadeesRef()
      const res = await fetch(
        `/api/random-hadees?edition=${ref.edition}&number=${ref.number}`
      )
      const data = await res.json()
      setHadees(data.text)
      setUrduTranslation(data.urdu)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchHadees()
  }, [])

  const handleShareImage = async () => {
    shareImage(ref)
  }

  const handleSharePDF = async () => {
    sharePDF(ref)
  }

  return (
    <Hadith
      handleShareImage={handleShareImage}
      handleSharePDF={handleSharePDF}
      hadees={hadees}
      linkToAuthenticateHadith={linkToHadith}
      totalDonations={null}
      urduTranslation={urduTranslation}
      ref={ref}
    />
  )
}
