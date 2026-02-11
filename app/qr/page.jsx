'use client'

import { useEffect, useRef } from 'react'
import { setPageMeta } from '../helpers/pageMeta'
import { generateQRCode } from '../helpers/generateQRCode'

export default function QRPage() {
  const canvasRef = useRef()

  useEffect(() => {
    setPageMeta({
      title: 'QR Code for Hadees',
      content: 'scan this QR code to view a random hadith.',
    })
  }, [])

  useEffect(() => {
    generateQRCode({ canvasRef, url: '/another' })
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className="font-bold">Scan This QR Code</h1>
      <canvas
        style={{
          margin: '0 auto',
        }}
        ref={canvasRef}
      ></canvas>
      <h1 className="text-xs">OR click to navigate without scanning</h1>
      <span className="text-sm underline">
        <a href="/another">Show me hadith</a>
      </span>
      <a href="/" className="flex justify-center mt-2">
        <span aria-hidden="true" className="mr-1">
          ←
        </span>
        <p className="text-right text-sm ">Home</p>
      </a>
    </div>
  )
}
