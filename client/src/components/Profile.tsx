import React from 'react'
import { appUseSelector } from '../hooks/reduxHooks'

export const Profile = () => {
    const user = appUseSelector(state=> state.user)
  return (
    <div className='profilePage'>
        <div className='profilePageHeader'>
            <img src={user.img}/>
            <h1>{user.username}</h1>
        </div>

        <div>
            <h2>Email: {user.email}</h2>
        </div>
    </div>
  )
}
