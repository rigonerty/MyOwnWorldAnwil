import React, { useState } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import cl from "./AdditionalToolbarForText.module.css"
import { EditorState } from 'react-draft-wysiwyg'
import { onToggleBlockType } from '../TextEditor/TextEditor'
interface props{
  isToggleFocus: [null,null]|[any,any]
}

export const AdditionalToolbarForText = ({isToggleFocus}:props) => {
    const [isWidth, setWidth] = useState("")
    const createComponent = (type:any)=>{
      if(isToggleFocus[0] !== null){
        onToggleBlockType(type,isToggleFocus[1],isToggleFocus[0])
      }
    }
  return (
    <div className={cl.AddToolBar}>
        <div className={cl.AddToolBarContainer}>
          <Button onClick={(e)=>{e.preventDefault(); createComponent('FloatComponent')}}>Create Float Componet</Button>
          <div>
            <Input 
                name="Max-width" 
                description='Пожалуйста, вводите данные на основе процентного соотношения. И вводите текст компонента сразу так как он перекрывается другими компонентами.' 
                value={isWidth} 
                setValue={setWidth}
                placeholder='Введите ширину компонента'
                type='number'/>
          </div>
        </div>
        
    </div>
  )
}
