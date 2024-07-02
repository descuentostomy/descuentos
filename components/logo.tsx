import Link from 'next/link'
import { RiPercentFill } from 'react-icons/ri';

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center h-10 gap-1 px-2 text-white bg-pink-600 rounded-lg hover:scale-110 transition-transform"
    >
      <h1 className="sr-only">Descuentos Tomy</h1>
      <RiPercentFill aria-hidden className="text-2xl" />
      <span>Descuentos Tomy</span>
    </Link>
  )
}
