import Link from 'next/link';
import { RiPercentFill } from 'react-icons/ri';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white">
      <h1 className="sr-only">Descuentos Tomy</h1>
      <div className="flex items-center justify-center w-12 h-12 bg-pink-600 rounded-full shadow-lg hover:scale-110 transition-transform">
        <RiPercentFill className="text-3xl" />
      </div>
      <span className="text-2xl font-bold tracking-wide">
        Descuentos <span className="text-pink-600">Tomy</span>
      </span>
    </Link>
  );
}
