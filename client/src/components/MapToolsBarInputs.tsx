import React, { useEffect, useState } from 'react'
import { Input } from './UI/Input/Input'
import { Textarea } from './UI/Textarea/Textarea'
import { MapToolsBarSelectArticle } from './MapToolsBarSelectArticle'
import { markers } from './Map'
import { Button } from './UI/Button/Button'
interface props{
    isActive: string;
    setCreatedMarker?: (markers:markers,type:string)=> void;
    isCreatedMarker?:markers|null;
    type?:string;
    updateMarker?:markers
}
export const MapToolsBarInputs = ({isActive,setCreatedMarker,isCreatedMarker,type="create",updateMarker}:props) => {
    const [isName,setName] = useState(updateMarker?updateMarker.name:"")
    const [isDescription,setDescription] = useState(updateMarker?updateMarker.description:"")
    const [isRadius, setRadius] = useState(updateMarker?updateMarker.radius:10)
    const [isColor,setColor] = useState(updateMarker?updateMarker.color:"#ffffff")
    const [isSelectValue, setSelectValue] = useState(updateMarker?updateMarker.articleId.slice(-11):"none")
    const [isChoosePoints,setChoosePoints] = useState(false)
    const [isLineWidth, setLineWidth] = useState(5)
    const createMarker = (type:string = "noPoly")=>{
        if(isName&&isDescription&&setCreatedMarker){
            const markerData:markers = {
                name:isName,
                description: isDescription,
                type:isActive,
                id:Math.round(Math.random()*10000000000000),
                radius: isActive==="Circle"?isRadius:0,
                color: isColor,
                articleId:isSelectValue,
                lineWidth:isLineWidth
            }
            setSelectValue("none")    
            setCreatedMarker(markerData,type)       
        }
    }
    useEffect(()=>{
        if(isCreatedMarker===null){
            setName("")
            setDescription("")
            setRadius(10) 
            setChoosePoints(false)           
        }     
    },[isCreatedMarker])
  return (
    <div className='MapToolsInputs'>
        <Input value={isName} placeholder='Введите название' setValue={setName} name='Название'/>
        <p>Описание</p>
        <Textarea value={isDescription} setValue={setDescription} placeholder='Введите описание'></Textarea>
        <MapToolsBarSelectArticle setValue={setSelectValue}/>
        {isActive!=="Pin"&&
            <Input value={isColor} setValue={setColor} name='Цвет' placeholder='Выберите цвет' type='color'/>

        }
        {isActive === "Circle"&&
            <Input value={isRadius} setValue={setRadius} name='Радиус' placeholder='Введите радиус' type='number'/>
        }
        {isActive ==="Line"&&
            <Input value={isLineWidth} placeholder='Введите ширину линии' setValue={setLineWidth} name='Ширина линии' type='number'/>
        }
        {type==="create" &&
            <div className='MapToolsBarCreating'>
                {isActive==="Line"||isActive==="Polygon"
                    ?<><Button onClick={()=>createMarker("poly")}>Создать</Button>
                        <Button onClick={()=>{createMarker();setChoosePoints(!isChoosePoints)}} style={!isChoosePoints?{}:{border:"1px solid white"}}>Выбор точек</Button>
                    </>
                    :<Button onClick={()=>createMarker("noPoly")}>Создать</Button>
                }
            </div>
        }
        {type==="update" &&
            <div>
                <Button onClick={()=>createMarker("noPoly")}>Обновить</Button>
            </div>

        }

    </div>
  )
}
