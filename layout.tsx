import type React from "react"
import type { Metadata } from "next"
import { Geist } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Travel Wishlist - Ваш дневник путешествий",
  description: "Сохраняйте места мечты и отмечайте посещенные. Управляйте вашим списком путешествий.",
  generator: "v0.app",
}

const geistSans = Geist({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={geistSans.className}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
