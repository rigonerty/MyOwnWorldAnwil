import React, { useEffect } from 'react'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { useParams } from 'react-router-dom'
import { getUserById } from '../store/users'

export const Profile = () => {
  const {id} = useParams()
  const user = appUseSelector(state=> state.users.find(a=>a.id+"" === id))
  const profile = appUseSelector(state=> state.user)
  const dispatch = appUseDispatch()
  useEffect(()=>{
    if(id&&!user&& profile.id+""!==id) dispatch(getUserById(+id))
  },[])
  if(profile.id+""===id){
    return (
      <div className='profilePage'>
          <div className='profilePageHeader'>
              <img src={profile.img}/>
              <h1>{profile.username}</h1>
          </div>

          <div>
              <h2>Email: {profile.email}</h2>
          </div>
      </div>
    )
  }
  if(!user){
    return <div className='profilePage'>
      <h1>Пользователь не найден</h1>
    </div>
  }
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
