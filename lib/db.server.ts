import 'server-only'
import { getXataClient, TitlesRecord } from '~/lib/xata.codegen'
import { gte, le, includes, contains, includesAll, includesAny } from '@xata.io/client'
import { movie, movieList, OMDBschema } from './schemas'

const xata = getXataClient()

export const getMovie = async (id: TitlesRecord['id']) => {
  const title = await xata.db.titles.read(id)

  if (title === null) {
    console.error(`there is no movie with ${id}`)
    return null
  }

  return movie.parse(title)
}

export const getFunFacts = async () => {
  const { aggs } = await xata.db.titles.aggregate({
    totalCount: {
      count: '*',
    },
    sumVotes: {
      sum: {
        column: 'numVotes',
      },
    },
    ratingsAbove6: {
      count: {
        filter: {
          averageRating: { $gt: 6 },
        },
      },
    },
    rate6: {
      count: {
        filter: {
          averageRating: 6,
        },
      },
    },
    ratingsBelow6: {
      count: {
        filter: {
          averageRating: { $lt: 6 },
        },
      },
    },
  })

  return {
    totalTitles: aggs.totalCount.toLocaleString('en-US'),
    totalVotes: (aggs.sumVotes ?? 0).toLocaleString('en-US'),
    high: aggs.ratingsAbove6.toLocaleString('en-US'),
    low: aggs.ratingsBelow6.toLocaleString('en-US'),
    mid: aggs.rate6.toLocaleString('en-US'),
  }
}
export const getTotalTitles = async () => {
  const { aggs } = await xata.db.titles.aggregate({
    totalCount: {
      count: '*',
    },
  })

  return {
    totalTitles: aggs.totalCount.toLocaleString('en-US'),
  }
}

export const fetchDefaultTitles = async () => {
  const { records: titles } = await xata.db.titles
    .filter({
      $exists: 'startYear',
      titleType: 'movie',
      isAdult: true,
    })
    .filter({
      startYear: le(new Date().getFullYear()),
      averageRating: gte(7), // only movies with high average rating
      numVotes: gte(200000), // only movies with a bunch of votes
    })
    .sort('startYear', 'desc')
    .getPaginated({
      pagination: {
        size: 20,
      },
    })

  return {
    titles: movieList.parse(titles.filter(({ summary }) => summary !== 'N/A')),
  }
}

export const searchMovies = async (term: string, filters: string) => {
  // Convert the comma-separated filters string into an array of genres
  const genresFilter = filters ? filters.split(',') : [];

  // Construct the filter object based on whether filters are provided
  let filterTerm: any = {
    summary: contains(term)
  };

  if (filters) {
    // Use $in operator to match any genre in genresFilter array
    filterTerm.genres = { $includesAny: genresFilter.map(genre => contains(genre)) };
    // filterTerm.genres = { $includesAny: [{ $contains: 'modo' }] }
  }

  console.log(JSON.stringify(filterTerm));

  const { records } = await xata.db.titles
  .filter(filterTerm)
  .select([
    "titleType",
    "primaryTitle",
    "originalTitle",
    "isAdult",
    "startYear",
    "endYear",
    "runtimeMinutes",
    "genres",
    "numVotes",
    "averageRating",
    "coverUrl",
    "summary",
  ])
  .getPaginated({
    pagination: {
      size: 15,
    },
  });

  return {
    titles: movieList.parse(
      records.filter(({ summary }) => summary && summary !== 'N/A')
    ),
  }
}

export const getMovies = async (term: string, filters: string) => {
  return term.length > 0 || filters.length > 0 ? await searchMovies(term, filters) : await fetchDefaultTitles()
}

export const voteRating = async (vote: number, title: string) => {
  // UI is base 5, rating DB is base 10
  const voteRating = vote * 2
  const { averageRating, numVotes } = movie.parse(
    await xata.db.titles.filter('id', title).getFirst()
  )

  if (typeof averageRating !== 'number' || typeof numVotes !== 'number') {
    await xata.db.titles.update({
      id: title,
      averageRating: voteRating,
      numVotes: 1,
    })
  } else {
    const currentSum = averageRating * numVotes
    const totalVotes = numVotes + 1
    const newRate = (currentSum + voteRating) / totalVotes
    await xata.db.titles.update({
      id: title,
      averageRating: newRate,
      numVotes: totalVotes,
    })
  }

  return
}
