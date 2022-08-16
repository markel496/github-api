import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="h-[50px] flex justify-between items-center shadow-md px-5 bg-gray-500 text-white">
      <h3 className="font-bold">GitHub Search</h3>
      <div>
        <Link to="/" className="mr-3">
          Home
        </Link>
        <Link to="/favourites">Favourites</Link>
      </div>
    </nav>
  )
}

export default Navigation
