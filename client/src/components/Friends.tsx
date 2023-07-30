import React, { useEffect, useState } from 'react'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { Button } from './UI/Button/Button'
import { acceptRequestToUser, deleteRequestToUser, getAllFriendsToUser, getAllRequestsToUser, sendRequestToUser } from '../store/user'
import { FriendsView } from './UI/FriendView/FriendsView'
import { Input } from './UI/Input/Input'
import { getUserById, getUserByIdData } from '../store/users'





export const Friends = () => {
    const user = appUseSelector(state=>state.user)
    const users = appUseSelector(state=>state.users)
    const friends = appUseSelector(state=>state.user.friends)
    const requests = appUseSelector(state=> state.user.requests)
    const [isVisible, setVisible] = useState("List")
    const [isValue, setValue] = useState("")
    const [isResultSearch, setResultSearch]= useState<getUserByIdData>()
    const [isInterval,setInterval] = useState(true)
    const dispatch = appUseDispatch()
    useEffect(()=>{
      if(user.id){
        dispatch(getAllRequestsToUser({id:user.id}))
        dispatch(getAllFriendsToUser({id:user.id}))
      }
    },[])
    useEffect(()=>{
      setTimeout(()=>{
        setInterval(!isInterval)
      },5000)
      if(user.id){
        dispatch(getAllRequestsToUser({id:user.id}))
      }
    },[isInterval])
    useEffect(()=>{
      if(users)setResultSearch(users.find(a=>a.id === +isValue))
    },[users])
    const onClickHandler = (type:string,id:number|null)=>{
      if(type==="add"&&user.id&&id) dispatch(acceptRequestToUser({id:id,idTo:user.id}))
      if(type==="refuse"&&user.id&&id) dispatch(deleteRequestToUser({id:user.id,idTo:id}))
      if(type==="delete"&&user.id&&id) dispatch(deleteRequestToUser({id:user.id,idTo:id}))
      if(type==="send"&&user.id&&id) dispatch(sendRequestToUser({id:user.id,idTo:id}))
    }
  return (
    <div className='FriendsPage'>
      <div className='FriendsPageHeader'>
        <Button onClick={()=> {setVisible("List")}}>Список друзей</Button>
        <Button onClick={()=> {setVisible("Request")}}>Запросы в друзья</Button>
        <Button onClick={()=> {setVisible("Search")}}>Поиск</Button>        
      </div>
      <div style={isVisible==="List"?{}:{display:"none"}} className='FriendsPageContent'>
        {friends && friends.length
          ? friends.map(friend=>{
            return <FriendsView user={friend} onClickHandler={onClickHandler} type='friend'/>
          })
          :<><h2>У вас пока нет друзей.</h2><h6>лох</h6></>
        }
      </div>
      <div style={isVisible==="Request"?{}:{display:"none"}} className='FriendsPageContent'>
        {requests&&requests.length
          ?requests.map(req=>{
            return <FriendsView user={req} type='request' onClickHandler={onClickHandler}/>
          })
          :<><h2>Запросы в друзья отсутствуют.</h2></>
        }
      </div>
      <div style={isVisible==="Search"?{}:{display:"none"}} className='FriendsPageContentSearch'>
        <div>
          <Input name='' placeholder='Введите сюда id пользователя.' setValue={setValue} value={isValue} type='number'/>
          <Button onClick={()=>{
            if(isValue.length ===12 &&+isValue!==user?.id) dispatch(getUserById(+isValue))      
          }}>Поиск</Button>          
        </div>
          <div>{isResultSearch&&<FriendsView user={isResultSearch} type='preview' onClickHandler={onClickHandler}/>}</div>
      </div>
    </div>
  )
}
