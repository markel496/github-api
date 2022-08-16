import React, { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'

const FavouritesPage: React.FC = () => {
  const { favourites } = useAppSelector((state) => state.github)
  const { removeFavourite } = useActions()

  const removeFromFavourites = (
    event: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    event.preventDefault()
    removeFavourite(url)
  }

  if (favourites.length === 0)
    return (
      <p className="text-center pt-10 text-red-500 font-medium">No items.</p>
    )

  return (
    <div className="pt-10 px-5 h-[calc(100vh_-_50px)] max-w-[560px] w-full mx-auto">
      <ul>
        {favourites?.map((el) => (
          <li className="mb-2 flex justify-between items-center" key={el}>
            <a
              className="mr-3 overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
              href={el}
              target="_blank"
            >
              {el}
            </a>
            <button
              className="py-2 px-4 rounded bg-red-300 hover:shadow-md transition-all"
              onClick={(e) => removeFromFavourites(e, el)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FavouritesPage
