import React, { useState } from 'react'
import cl from "./ChangeContent.module.css"
import { Button } from '../Button/Button';
interface props{
    names: Array<string>;
    elements: Array<React.ReactElement>
}
export const ChangeContent = ({names, elements}:props) => {
    const [isIndex,setIndex] = useState(0)
    if(names.length !== elements.length){
        return <p>Количество назаний и елементов должно быть одинаково</p>
    }
  return (
  <>
        <div className={cl.ChangeContentHeader}>
            {names.map((name, index)=>{
                return <Button onClick={()=>setIndex(index)}>{name}</Button>
            })}
        </div>  
        {elements.map((element,index)=>{
            if(index === isIndex){
              return <div className={cl.ChangeContentVisible}>
                        {element}
                     </div>
                
            }
            return <div className={cl.ChangeContentUnVisible}>
                        {element}
                    </div>
        })}
  </>

  )
}
