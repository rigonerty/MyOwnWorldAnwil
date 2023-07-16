import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import cl from "./Navbar.module.css"
import { Dropdown } from '../DropDown/Dropdown';
import { UnAuth } from './unAuth/UnAuth';
import { appUseSelector } from '../../../hooks/reduxHooks';
import { Auth } from './Auth/Auth';
export const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const isAuth = appUseSelector(state=>state.user.isAuth)
  return (
    <nav className={cl.navbar}>
        <div>
            <Link to={"/"}>Главная</Link>
            <Dropdown side={false} visible={visible} setVisible={setVisible}>
              <div className={cl.dropdownContent}>
                <div>
                  <h3>Для Кого:</h3>
                  <hr/>
                  <Link to={"/ForGamemasters"}>Для Гейммастеров</Link>
                  <Link to={"/ForWrites"}>Для Писателей</Link>
                  <Link to={"/ForCreative"}>Для Творчества</Link>                  
                </div>
                <div>
                  <h3>Детали</h3>
                  <hr/>
                  <Link to={"/AboutChronicles"}>Хроники</Link>
                  <Link to={"/AboutTimelines"}>Таймлайны</Link>
                  <Link to={"/AboutArtilce"}>Статьи</Link>
                  <Link to={"/AboutFamilyTrees"}>Семейные древа</Link>
                </div>
              </div>
            </Dropdown>
            <button onClick={()=>setVisible(vis=>!vis)} style={{position: "relative"}}>
              Особенности <span className={cl.arrow}>‣</span>
            </button>

        </div>
        {!isAuth
        ?
          <UnAuth/>
        :
          <Auth/>
        }
        
    </nav>
  )
}
