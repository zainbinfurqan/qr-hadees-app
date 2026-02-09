import "./globals.css";
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
import ForegroundNotifications from "./components/ForegroundNotifications";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { InstallPrompt } from "./components/SubscribePushNotification";

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
        <ForegroundNotifications />
         <InstallPrompt/>
         <Analytics />
         <SpeedInsights />
      </body>
    </html>
  );
}
