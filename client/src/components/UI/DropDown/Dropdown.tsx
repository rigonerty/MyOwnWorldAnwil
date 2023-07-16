import React from 'react'
import cl from "./Dropdown.module.css"
interface Props{
    side: boolean,
    visible:boolean,
    setVisible: Function,
    children: React.ReactNode
}
export const Dropdown= ({side,children,visible,setVisible}:Props) => {
    const clx = [cl.dropdown]
    if(visible){
        clx.push(cl.active)
    }
  return (
    <div className={clx.join(" ")}>  
        <div className={cl.background} onClick={()=> setVisible(false)}>
            
        </div>
        <div onClick={(e)=> e.stopPropagation()} className={side?cl.content+" "+cl.side:cl.content}>
          {children} 
        </div>   
    </div>

  )
}
