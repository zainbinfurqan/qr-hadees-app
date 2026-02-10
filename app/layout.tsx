import "./globals.css";
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { InstallPrompt } from "./components/SubscribePushNotification";
import { Metadata } from "next";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200','300','400','500','600','700','800','900'],
  variable: '--font-nunito'
})

export const metadata: Metadata = {
  title: "Hadess App",
  description: "Learn a new hadith everyday. Share authentic hadiths with your friends and family.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icon-192x192.png" },
    { rel: "icon", url: "icon-192x192.png" },
  ],
};

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
