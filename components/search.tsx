'use client'
import { useRouter } from 'next/navigation'
import { RiSearchLine } from 'react-icons/ri';
import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';


export const Search = ({ term }: { term?: string }) => {
  const { push } = useRouter()
  const genres = ['Lunes', 'Martes', 'Miercoles', 'Viernes', 'Jueves', 'Sabado', 'Domingo'];

  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('searchField') as string;
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedGenres.length) params.set('genres', selectedGenres.join(','));
    router.push(`/?${params.toString()}`);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="relative max-w-4xl mx-auto">
        <MagnifyingGlass
          className="absolute top-4 left-4 w-5 h-5 text-gray-400 pointer-events-none"
          aria-hidden
        />
        <input
          type="search"
          name="searchField"
          defaultValue={typeof term === 'string' ? decodeURI(term) : ''}
          autoComplete="off"
          className="block w-full p-4 pl-10 text-sm text-white placeholder-gray-400 border rounded-2xl border-slate-700 bg-slate-900 focus:border-pink-500 outline-pink-600"
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-xl text-sm px-4 py-2 bg-pink-600 hover:bg-pink-700 focus:ring-pink-800"
        >
          Buscar
        </button>
      </div>
      <button
      onClick={() => setFiltersVisible(!filtersVisible)}
      className="mt-4 p-2 bg-pink-600 hover:bg-pink-700 focus:ring-pink-800 rounded inline-flex items-center"
    >
      <FaFilter className="mr-2" />
      {filtersVisible ? 'Ocultar filtros' : 'Mostrar filtros'}
    </button>
    {filtersVisible && (
      <div className="mt-4">
        <div className="flex flex-wrap justify-center gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`px-4 py-2 border rounded ${
                selectedGenres.includes(genre)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    )}
    </form>
  )
}

function MagnifyingGlass({ className, ...props }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}
