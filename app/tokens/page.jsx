'use client'

import { useEffect, useState } from 'react'

export default function TokensPage() {
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)

  useEffect(() => {
    document.title = 'FCM Tokens'
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

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      alert('Failed to copy')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="flex items-center gap-1 text-sm mb-6">
          ← Home
        </a>

        <h1 className="text-3xl font-bold mb-6">FCM Tokens</h1>

        {loading && <p className="text-center">Loading tokens...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {!loading && !error && tokens.length > 0 && (
          <div className="space-y-3">
            {tokens.map((token, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-zinc-900 shadow-md rounded-lg p-4 text-sm break-all flex justify-between items-start gap-3"
              >
                <span className="flex-1">{token.fcmtoken}</span>

                {/* Copy Button */}
                <button
                  onClick={() => copyToClipboard(token.fcmtoken, index)}
                  className="shrink-0 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition  self-center"
                >
                  {copiedIndex === index ? (
                    <span className="text-green-600 text-xs font-semibold">
                      Copied!
                    </span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-600 dark:text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && tokens.length === 0 && (
          <p className="text-center text-gray-600">No tokens found.</p>
        )}
      </div>
    </div>
  )
}