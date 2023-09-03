import React from 'react'
import cl from "./SaveInfo.module.css"
interface props{
    isActive:boolean;
    text:string;
}
export const SaveInfo = ({isActive,text}:props) => {
    const clx = [cl.SaveInfo]
    if(isActive){
        clx.push(cl.Active)
    }
  return (
    <div className={clx.join(" ")}>
        <div></div>
        <p>{text}</p>
    </div>
  )
}
