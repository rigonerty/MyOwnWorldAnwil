import React from 'react'
import cl from "./Modal.module.css"
interface props{
    children: React.ReactNode,
    visible: boolean,
    setVisible: (vis:boolean)=>void
}
export const Modal = ({children,visible,setVisible}:props) => {
    const clx = [cl.ModalBack]
    if(visible){
        clx.push(cl.active)
    }
  return (
    <div onClick={()=> setVisible(false)} className={clx.join(" ")}>
        <div onClick={(e)=> e.stopPropagation()} className={cl.ModalContent}>
            {children}
        </div>
    </div>
  )
}
