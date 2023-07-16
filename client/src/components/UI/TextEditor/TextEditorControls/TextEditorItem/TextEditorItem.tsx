import React from 'react'
import cl from "./TextEditorItem.module.css"
interface props{
    children: React.ReactNode,
    isActive: boolean,
    onTonggle: (style:string)=> void,
    style: string 
}
export const TextEditorItem = ({children,isActive,onTonggle,style}:props) => {
    const onTonggleHandler = (e: React.MouseEvent)=>{
        e.preventDefault()
        onTonggle(style)
    }
    const clsx = [cl.TextEditorItem]
    if(isActive){
        clsx.push(cl.active)
    }
  return (
    <button onClick={onTonggleHandler} className={clsx.join(" ")}>
        {children}
    </button>
  )
}
