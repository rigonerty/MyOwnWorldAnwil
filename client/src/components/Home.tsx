import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='Home'>
        <header>
          <h1>Создавай свой мир.</h1>
          <h1>Работай со своими друзьями над планетой.</h1>
          <h1>Планируй и развивай мир своей книги.</h1>
          <Link to="/tools">Начни сейчас</Link>
        </header>
    </div>
  )
}
