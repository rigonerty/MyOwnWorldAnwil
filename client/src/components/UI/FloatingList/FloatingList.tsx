import React, { useState } from 'react'
import { Button } from '../Button/Button'
import cl from "./FloatingList.module.css"
interface props{
    children: React.ReactNode;
    name:string 
}
export const FloatingList = ({children,name}:props) => {
    const [isVisible, setVisible] = useState(false)
  return (
    <div className={cl.FloatingList}>
        <Button onClick={()=> setVisible(!isVisible)}>{name} <span>‣</span></Button>
        <div className={isVisible?cl.FloatingListVisible: ""}>
          {children}  
        </div>
    </div>
  )
}
