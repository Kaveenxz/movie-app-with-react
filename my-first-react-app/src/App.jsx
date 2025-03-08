import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODk2ZGY2ZjY5ZjIxOWEzNTRjZTU4NDgzNmU2ZmI4NiIsIm5iZiI6MTc0MTQyMTA3NS44MDgsInN1YiI6IjY3Y2JmYTEzN2M5NjdlMDRkNTViYTNiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u-7Si3ur9o2zeGVAbvgGSN_0Blq3ZxbM56PVOnW3Grc"


const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const responce = await fetch(endpoint, API_OPTIONS)
      if(!responce.ok){
        throw new Error('Failed to fetch movies')
      }

      const data = await responce.json()

      if(data.Responce === 'False'){
        setErrorMessage(data.error || 'Faild to fetch data')
        setMovieList([])
        return
      }

      setMovieList(data.results || [])
    } catch (err) {
      console.log('error featching movies' + err)
      setErrorMessage("Error featching movies, Please try again later.")
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
      fetchMovies()
  }, [])
  return (
    <main>
      <div className='pattern' />

      <div className="wrapper">
        <header>
          <img src='./hero-img (1).png' alt='hero-banner' />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className='mt-20'>All Movies</h2>

         {isLoading ? (
          <Spinner/>
         ): errorMessage? (
          <p className="text-red-500">{errorMessage}</p>
         ): (
          <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul>
         )}
         </section>
      </div>
    </main>
  )
}

export default App
