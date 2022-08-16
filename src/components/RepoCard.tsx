import React, { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/models'

type TRepoCard = {
  repo: IRepo
}

const RepoCard: React.FC<TRepoCard> = ({ repo }) => {
  //({ repo }: {repo: Irepo})

  const { favourites } = useAppSelector((state) => state.github)
  const { addFavourite, removeFavourite } = useActions()

  const [isFav, setIsFav] = useState(
    favourites.find((f) => f === repo.html_url)
  )

  const addToFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addFavourite(repo.html_url)
    setIsFav(repo.html_url)
  }

  const removeFromFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    removeFavourite(repo.html_url)
    setIsFav(undefined)
  }

  return (
    <div className="border px-5 py-2 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a className="block" href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold mb-1">{repo.name}</h2>
        <p className="text-sm mb-1">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        {repo.description && <p className="font-thin">{repo.description}</p>}
      </a>
      {repo.homepage && (
        <a
          className="mb-1 inline-flex hover:underline"
          href={repo.homepage}
          target="_blank"
        >
          {repo.homepage}
        </a>
      )}
      <div className="flex items-center">
        {!isFav && (
          <button
            className="mr-3 py-2 px-4 rounded bg-yellow-200 hover:shadow-md transition-all"
            onClick={addToFavourites}
          >
            Add
          </button>
        )}
        {isFav && (
          <button
            className="py-2 px-4 rounded bg-red-300 hover:shadow-md transition-all"
            onClick={removeFromFavourites}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default RepoCard
