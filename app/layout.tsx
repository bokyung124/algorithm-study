import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import ServiceWorkerRegister from './ServiceWorkerRegister'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Algorithm Study',
    template: '%s | Algorithm Study',
  },
  description: '코딩 테스트 대비를 위한 알고리즘 & SQL 학습 플랫폼. 41개 카테고리, 85개 시각화, AI 튜터, 간격 반복 복습을 제공합니다.',
  icons: {
    icon: '/favicon.svg',
    apple: '/icon-192x192.png',
  },
  openGraph: {
    title: 'Algorithm Study',
    description: '코딩 테스트 대비를 위한 알고리즘 & SQL 학습 플랫폼',
    type: 'website',
    locale: 'ko_KR',
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
    <html lang="ko" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <ServiceWorkerRegister />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
