import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lerdi Salihi | Journey Map CV',
  description: 'Computer Science Student · DevOps Apprentice · Builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

