import React, { useLayoutEffect, useRef, useState } from 'react'
import cl from "./Textarea.module.css"
interface props{
    value:string;
    setValue: (smth:string)=>void;
    placeholder:string
}
export const Textarea = ({value,setValue,placeholder}:props) => {
    const [isHeight, setHeight] = useState(150)
    const textareaRef = useRef<any>(null)
    useLayoutEffect(() => {
      if(textareaRef.current){
        textareaRef.current.style.height = "0";
        textareaRef.current.style.height = `${Math.max(
          textareaRef.current.scrollHeight,
          isHeight
        )}px`;
      }
  }, [value]);
  return (
    <textarea 
        onChange={(e)=>{setValue(e.target.value)}}
        ref={textareaRef}
        value={value} 
        className={cl.Textarea} 
        placeholder={placeholder}
        style={{height:`${isHeight}px`}}>

    </textarea>
  )
}
