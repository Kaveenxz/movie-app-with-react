import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState()
  return (
    <main>
      <div className='pattern'/>

      <div className="wrapper">
        <header>
          <img src='./hero-img (1).png' alt='hero-banner'/>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App
 