import type { Metadata, Viewport } from 'next'
import './globals.css'
import Providers from './providers'
import ServiceWorkerRegister from './ServiceWorkerRegister'

export const metadata: Metadata = {
  title: 'Algorithm Study',
  icons: {
    icon: '/favicon.svg',
    apple: '/icon-192x192.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Algorithm Study',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ServiceWorkerRegister />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
