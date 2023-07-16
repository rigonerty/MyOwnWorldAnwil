import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='Home'>
        <header>
          <h1>Create your world.</h1>
          <h1>Work with your friends to create planet.</h1>
          <h1>Plan and build your novel.</h1>
          <Link to="/tools">Start Now</Link>
        </header>
        {/* <div>
          <h2>What Forge provides:</h2>
          <div>
            <p>
              Forge is set of tools that can help you to create and build your world or make easy to run a company. 
            </p>
            <h3>There some tools that can help you</h3>
            <div>
              <h4>Chronicles</h4>
              <p>Write history chronicles in your world</p>
            </div>
          </div>
        </div> */}
    </div>
  )
}
