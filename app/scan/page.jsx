'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ScanPage() {
  const [hadees, setHadees] = useState('Loading hadees...')

  useEffect(() => {
    async function runFlow() {
      try {
        // Device info
        const deviceInfo = {
          ua: navigator.userAgent,
          platform: navigator.platform,
          screen: `${screen.width}x${screen.height}`,
          time: new Date().toISOString(),
        }

        // Log scan
        await axios.post('/api/log-scan', deviceInfo)

        // Get random hadees
        const { data } = await axios.get('/api/random-hadees')
        setHadees(data.text)
      } catch (err) {
        console.error(err)
        setHadees('Failed to load hadees.')
      }
    }

    runFlow()
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Random Hadith</h1>
      <p style={{ fontSize: '1.5rem' }}>{hadees}</p>
    </div>
  )
}
