import React from 'react'
import { getUserByIdData } from '../../../store/users'
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button'
import cl from "./FriendsView.module.css"
interface props{
    user: getUserByIdData,
    type?:string
    onClickHandler: (type:string,id:number|null)=>any
}
export const FriendsView = ({user,type="search",onClickHandler}:props) => {
  return (
    <div className={cl.FriendsView}>
        <img src={user.img}/>
        <div className={cl.FriendsViewUserInfo}>
            <Link to={"/user/"+user.id}><h3>{user.username}</h3></Link>
            <h4>id: {user.id}</h4>
        </div>
        {type==="request"
            ?<div className={cl.FriendsViewOptions}>
                <Button onClick={()=>onClickHandler("add",user.id)}>Добавить</Button>
                <Button onClick={()=>onClickHandler("refuse",user.id)}>Отказать</Button>
            </div>
            :type==="friend"?
            <div className={cl.FriendsViewOptions}>
                <Button onClick={()=>onClickHandler("delete",user.id)}>Удалить</Button>
            </div>
            :<div className={cl.FriendsViewOptions}>
                <Button onClick={()=>onClickHandler("send",user.id)}>Отправить запрос</Button>
            </div>
        }
    </div>
  )
}
