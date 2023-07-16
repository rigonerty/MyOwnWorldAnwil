import React, { useState } from 'react'
import cl from "./Input.module.css"
interface props{
    value?: any;
    setValue: (value:any)=> void;
    placeholder: string;
    description?: string;
    name: string;
    type?: string;
    min?: number;
    max?: number;
}
export const Input = ({value=null, setValue,placeholder,description,name, type="text", min=4, max=20}:props) => {
    const [isVisible, setVisible] = useState(false)
  return (
        <label className={cl.Input}>
            <div className={cl.header}>
                {name}
                {description &&
                    <>
                        <button onClick={()=> setVisible(!isVisible)}></button>
                        {isVisible && <div className={cl.description}>{description}</div>}                        
                    </>
                }
     
            </div>
           <input 
            value={value} 
            onChange={(e)=> {
                if(type !=="file"){
                  setValue(e.target.value)  
                }else{
                    setValue(e.target.files)
                }
                
            }} 
            placeholder={placeholder} 
            type={type} 
            minLength={min} 
            maxLength={max}/> 
        </label>
  )
}
