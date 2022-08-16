import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import FavouritesPage from './pages/FavouritesPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/favourites" element={<FavouritesPage />}></Route>
      </Routes>
    </>
  )
}

export default App
