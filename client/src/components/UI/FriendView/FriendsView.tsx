import React from 'react'
import { getUserByIdData } from '../../../store/users'
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button'
import cl from "./FriendsView.module.css"
import { appUseSelector } from '../../../hooks/reduxHooks'
import { User } from '../../../models/User'
import { roles } from '../../../models/Tools'
interface props{
    user: getUserByIdData,
    type?:string
    onClickHandler: (type:string,id:number|null,role?:string)=>any,
    roles?:[string[],string[]]
}
export const FriendsView = ({user,type="search",onClickHandler,roles}:props) => {
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
                <select className={cl.FriendsViewSelectRole} onChange={(e)=>onClickHandler("selectRole",user.id, e.target.value)}>
                    {roles && roles[0].map(a=>{
                        for(const role of user.roles[1]){
                            if(a.search(role.split(" ")[0])!==-1){
                                return <option value={a} selected>{a}</option>
                            }                            
                        }
                        return <option value={a}>{a}</option>
                    })}
                </select>
            </div>
            :<div className={cl.FriendsViewOptions}>
                <Button onClick={()=>onClickHandler("send",user.id)}>Отправить запрос</Button>
            </div>
        }
    </div>
  )
}
