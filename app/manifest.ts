import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hadess App',
    short_name: 'Hadess App',
    description: 'Learn a new hadith everyday. Share authentic hadiths with your friends and family.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/icon-512.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
}