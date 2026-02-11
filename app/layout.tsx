import './globals.css'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Hadess App',
  description:
    'Learn a new hadith everyday. Share authentic hadiths with your friends and family.',
  manifest: '/manifest.json',
  keywords: ['hadees', 'hadees-pwa'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icon-192.jpg' },
    { rel: 'icon', url: 'icon-192.jpg' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={nunito.className}>
      <head>
        <link rel="apple-touch-startup-image" href="/splash/iphone.jpg" />
      </head>
      <body className={nunito.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
