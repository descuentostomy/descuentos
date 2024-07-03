import { SiInstagram as Instagram, SiX as X } from 'react-icons/si'
import { Logo } from './logo'

export const TopNav = () => (
  <nav className="container flex items-center justify-between w-full px-4 py-4 mx-auto lg:px-12">
    <Logo />

    <ul className="flex items-center gap-4 text-sm font-medium text-pink-800 font-serif">

      <li>
        <a href="https://www.instagram.com" rel="noopener noreferrer">
          <Instagram className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
        </a>
      </li>

      <li>
        <a href="https://x.com" rel="noopener noreferrer">
          <X className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
        </a>
      </li>
    </ul>
  </nav>
);
