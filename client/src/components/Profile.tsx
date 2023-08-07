import React, { useEffect } from 'react'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { useParams } from 'react-router-dom'
import { getUserById } from '../store/users'
import { ProfileItem } from './ProfileItem'
import { getArticles } from '../store/articles'

export const Profile = () => {
  const {id} = useParams()
  const user = appUseSelector(state=> state.users.find(a=>a.id+"" === id))
  const articles = appUseSelector(state=> state.articles.find(a=>a.id+""===id))
  const profile = appUseSelector(state=> state.user)
  const dispatch = appUseDispatch()
  useEffect(()=>{
    if(id&&!user&& profile.id+""!==id) {
      dispatch(getUserById(+id))
    }
    if(id)dispatch(getArticles({id:+id}))
  },[])
  if(profile.id+""===id){
    return (<ProfileItem user={profile} articles={articles}/>)
  }
  if(!user){
    return <div className='profilePage'>
      <h1>Пользователь не найден</h1>
    </div>
  }
  return (<ProfileItem user={user} articles={articles}/>)
}
