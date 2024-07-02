import { Suspense } from 'react'
import Loader from './loader'
import { getTotalTitles } from '~/lib/db.server'
import { SearchResult } from '../components/search-result'
import { Hero } from '~/components/hero'

const Home = async ({
  searchParams,
}: {
  searchParams: { search?: string, genres?: string  }
}) => {
  const { totalTitles = '0' } = await getTotalTitles()

  return (
    <main>
      <Hero searchTerm={searchParams.search} totalTitles={totalTitles} />
      <Suspense fallback={<Loader />}>
        {/** @ts-expect-error Server Component */}
        <SearchResult searchTerm={searchParams.search} filters={searchParams.genres}/>
      </Suspense>
    </main>
  )
}

export default Home
