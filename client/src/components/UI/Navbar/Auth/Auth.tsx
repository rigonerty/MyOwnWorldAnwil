import React, {useEffect,useState} from 'react'
import { appUseDispatch, appUseSelector } from '../../../../hooks/reduxHooks'
import cl from "./../Navbar.module.css"
import { getImage, logout,getRoles } from '../../../../store/user'
import { Dropdown } from '../../DropDown/Dropdown'
import { Link } from 'react-router-dom'
import { Button } from '../../Button/Button'
export const Auth = () => {
  const user = appUseSelector(state=> state.user)
  const dispatch = appUseDispatch()
  const [isVisible, setVisible] = useState(false)
  useEffect(()=>{
    if(user.id) {
      dispatch(getImage(user?.id))
      dispatch(getRoles({id:user.id}))
    }
  }, [ ])
  const logoutHandler = ()=>{
    dispatch(logout())
  }
  return (
    <div className={cl.AuthNav}>
      <Dropdown visible={isVisible} setVisible={setVisible} side={true}>
        <div className={cl.AuthDropDownContent}>
          <p style={{fontSize:"1.4em", textAlign:"center"}}>Привет, {user.username}</p>
          <Button onClick={logoutHandler}>Выйти</Button>
          <div>
            <Link to={"/user/settings"}>Настройки</Link>
            <Link to={"/user/"+user.id}>Профиль</Link>
            <Link to={"/tools"}>Инструменты</Link>
            <Link to={"/user/friends"}>Друзья</Link>
          </div>          
        </div>
      </Dropdown>
      <img src={user?.img?user.img: ""} alt='Аватар пользователя' onClick={()=>setVisible(true)}/>
    </div>
  )
}
