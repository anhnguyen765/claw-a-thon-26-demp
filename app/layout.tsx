import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BabyWhy - AI Decision Clarity Coach',
  description: 'Helping Product Owners navigate stakeholder conflicts and decision fatigue',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/sf-pro-display" />
      </head>
      <body>{children}</body>
    </html>
  )
}
