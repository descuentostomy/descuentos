import { type ReactNode } from 'react'
import { TopNav } from '~/components/top-nav'
import Footer from '../components/footer';
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
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
