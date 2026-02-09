import "./globals.css";
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200','300','400','500','600','700','800','900'],
  variable: '--font-nunito'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={nunito.className}>
      <body
        className={nunito.className}
      >
        {children}
         <Analytics />
         <SpeedInsights />
      </body>
    </html>
  );
}
