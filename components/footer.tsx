import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiInstagram as Instagram, SiX as X } from 'react-icons/si'


const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="container flex items-center justify-between w-full px-4 py-4 mx-auto lg:px-12">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Descuentos Tomy</h2>
          <p>&copy; 2024 Descuentos Tomy. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="text-2xl hover:text-blue-500" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <X className="text-2xl hover:text-blue-700" />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
