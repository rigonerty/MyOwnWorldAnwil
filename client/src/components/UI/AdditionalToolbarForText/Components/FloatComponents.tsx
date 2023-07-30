import React, { useState } from 'react'
import { Button } from '../../Button/Button'
import { Input } from '../../Input/Input'
import { onToggleBlockType } from '../../TextEditor/TextEditor'
import { addHandler } from '../../TextEditor/BlockRenderFunction'
interface props{
  isToggleFocus: [null,null]|[any,any]
}

export const FloatComponents = ({isToggleFocus}:props) => {
    const [isWidth, setWidth] = useState("")
    const [isImage,setImage] = useState<any>()
    const [isWidthImage, setWidthImage] = useState("auto")
    const [isHeightImage, setHeightImage] = useState("auto")
    const [isAlt, setAlt] = useState("")
    const createComponent = (type:any)=>{
      if(isToggleFocus[0] !== null){
        onToggleBlockType(type,isToggleFocus[1],isToggleFocus[0])
      }
    }
    const createIMGComponent = (type:string)=>{
      if(isToggleFocus[0]!== null&&isImage){
        const reader = new FileReader()
        reader.readAsDataURL(isImage[0])
        reader.onload = ()=>{
          const data = {
            src: reader.result as string,
            width: isWidthImage,
            height: isHeightImage,
            alt: isAlt,
            type: "IMAGE_FLOAT"
          }
          addHandler(data,isToggleFocus[0],isToggleFocus[1])    
        }
      }  
    }
  return (
            <div>
              <p>Текст:</p>
              <Input 
                  name="Max-width" 
                  description='Пожалуйста, вводите данные на основе процентного соотношения. И вводите текст компонента сразу так как он перекрывается другими компонентами.' 
                  value={isWidth} 
                  setValue={setWidth}
                  placeholder='Введите ширину компонента'
                  type='number'/>
              <Button onClick={(e)=>{e.preventDefault(); createComponent('FloatComponent')}} style={{width:"100%"}}>Создать</Button>
              <p>Изображение:</p>
              <Input setValue={setImage} name='' placeholder='Изображение' type='file'/>  
              <Input 
                  name="Ширина" 
                  value={isWidthImage} 
                  setValue={setWidthImage}
                  placeholder='Введите ширину компонента'/>
              <Input 
                  name="высота"  
                  value={isHeightImage} 
                  setValue={setHeightImage}
                  placeholder='Введите высоту компонента'/>
              <Input 
                  name="alt" 
                  value={isAlt} 
                  setValue={setAlt}
                  placeholder='Введите описание изображения'/>
              <Button onClick={(e)=>{e.preventDefault(); createIMGComponent('FloatComponent')}} style={{width:"100%"}}>Создать IMG</Button>
            </div>            
  )
}
