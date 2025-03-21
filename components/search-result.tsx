import { MoviesList } from '~/components/movies-list'
import { getMovies } from '~/lib/db.server'

export const SearchResult = async ({
  searchTerm = '',
  filters = '',
}: {
  searchTerm?: string
  filters?: string
}) => {
  const { titles = [] } = await getMovies(searchTerm, filters)

  return (
    <>
      {titles.length < 1 ? (
        <article className="grid place-items-center">
          <p>No se encontraron descuentos</p>
        </article>
      ) : (
        <article>
          {/** @ts-expect-error Server Component */}
          <MoviesList titles={titles} />
        </article>
      )}
    </>
  )
}
