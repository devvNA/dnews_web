import type { Metadata, Viewport } from 'next'
import { Anton, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const anton = Anton({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-display'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: "D'NEWS - Portal Berita Anti-Mainstream",
  description: 'No Filter, Just Facts. Bongkar habis berita tanpa basa-basi.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${anton.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
