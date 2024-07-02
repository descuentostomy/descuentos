import { type ReactNode } from 'react'
import { TopNav } from '~/components/top-nav'
import '~/lib/globals.css'

import { type Metadata } from 'next'

const image = `/xmdb-og.png` as const
const title = 'Descuentos Online'
const description =
  'Busca los mejores descuentos online.'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  title: title,
  description: description,
  openGraph: {
    images: [image],
    title: title,
    description: description,
    type: 'website',
  },
  twitter: {
    images: [image],
    title: title,
    description: description,
    card: 'summary_large_image',
  },
}

type RootLayoutProps = Record<'children' | 'modal', ReactNode>

function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="grid grid-rows-[auto,1fr,auto] min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
        <TopNav />

        <main className="container mx-auto">{children}</main>
        {modal}
        <footer className="flex items-center justify-center gap-2 py-12">
          <span>Copyright 2024 - Descuentos Tomy</span>
          <a
            className="inline-block"
            href="https://xata.io"
            rel="noopener noreferrer"
            target="_blank"
          >
          </a>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
