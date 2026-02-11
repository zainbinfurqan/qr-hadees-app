'use client'

import { useEffect, useState } from 'react'

export default function TokensPage() {
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'FCM Tokens'
    const descTag = document.querySelector('meta[name="description"]')
    if (descTag) {
      descTag.setAttribute('content', 'View all FCM tokens.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'View all FCM tokens.'
      document.head.appendChild(meta)
    }
  }, [])

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/save-token')
        if (!res.ok) throw new Error('Failed to fetch tokens')
        const data = await res.json()
        setTokens(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [])
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="flex items-center gap-1 text-sm mb-6">
          <span aria-hidden="true">←</span>
          <span>Home</span>
        </a>

        <h1 className="text-3xl font-bold mb-6">FCM Tokens</h1>

        {loading && (
          <p className="text-center text-gray-600">Loading tokens...</p>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold">
            Error: {error}
          </p>
        )}

        {!loading && !error && tokens.length === 0 && (
          <p className="text-center text-gray-600">No tokens found.</p>
        )}

        {!loading && !error && tokens.length > 0 && (
          <div className="overflow-x-auto">
            {tokens.map((token, index) => (
              <div
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="border p-3 text-sm break-all">
                  {token.fcmtoken}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
