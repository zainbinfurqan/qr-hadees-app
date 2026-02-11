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
        src: '/app-icon.jpg',
        sizes: '192x192',
        type: 'image/jpg',
      },
      {
        src: '/app-icon.jpg',
        sizes: '512x512',
        type: 'image/jpg',
      },
    ],
  }
}