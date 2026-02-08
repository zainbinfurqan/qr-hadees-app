import type { Metadata } from "next";
// import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200','300','400','500','600','700','800','900'],
  variable: '--font-nunito'
})
export const metadata: Metadata = {
  title: "Learn Hadees",
  description: "An app to learn random hadees with QR code scanning functionality.",
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
      </body>
    </html>
  );
}
