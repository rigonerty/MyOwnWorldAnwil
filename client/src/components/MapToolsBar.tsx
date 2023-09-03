import React, { useEffect, useState } from 'react'
import { markers } from './Map'
import { MapToolsBarButtons } from './MapToolsBarButtons';
import { MapToolsBarInputs } from './MapToolsBarInputs';
import { Button } from './UI/Button/Button';
interface props{
    setCreatedMarker: (markers:markers|null)=> void;
    isCreatedMarker:markers|null;
    FinishPutPolyMarker:()=>void;
    isFloat?:boolean;
}
export const MapToolsBar = ({setCreatedMarker,isCreatedMarker,FinishPutPolyMarker,isFloat=false}:props) => {
    const [isActive,setActive] = useState("Pin")
    const [isPosition, setPosition] = useState({startX:0,startY:0})
    const [isLeft,setLeft] = useState(0)
    const [isTop,setTop] = useState(0)
    const [isDrag,setDrag] = useState(false)
    const createMarker = (markerData:markers,type:string)=>{
            if(type==="noPoly")setCreatedMarker(markerData) 
            if(type==="poly")FinishPutPolyMarker()          
    }
    const moveImageHandler = (e:React.MouseEvent)=>{
        e.preventDefault()
        if(isDrag){
            const newLeft = isLeft + (e.clientX - isPosition.startX)
            const newTop = isTop + (e.clientY-isPosition.startY)
            setLeft(newLeft>0?newLeft:isLeft)
            setTop(newTop>0?newTop:isTop)
            setPosition({startX:e.clientX,startY:e.clientY})
        }
    }
    useEffect(()=>{ setCreatedMarker(null) },[isActive])
  return (
            <div className={isFloat?"ToolsForImgBlock ToolsForImgBlockFloat":'ToolsForImgBlock'} style={{top:isTop,left:isLeft}}
                onMouseMove={(e)=>moveImageHandler(e)}
                onMouseUp={()=>{setDrag(false)}}>
                {isFloat&&
                    <div 
                        className='ToolsForImgBlockFloatMove'
                        onMouseDown={(e)=>{ setPosition({startX:e.clientX,startY:e.clientY});setDrag(true)}} 
                        onMouseUp={()=>{setDrag(false)}}
                        style={isDrag?{background:"#464646"}:{}}>
                        
                    </div>
                }
                <MapToolsBarButtons isActive={isActive} setActive={setActive}/>
                <MapToolsBarInputs setCreatedMarker={createMarker} isActive={isActive} isCreatedMarker={isCreatedMarker} />

                <p>{isCreatedMarker&& `Маркер создан. ${isCreatedMarker.type==="Line"||isCreatedMarker.type==="Polygon"?"Кликните на карту для выбора точек.":"Кликните на любое место на карте, чтобы его поставить."}`}</p>
            </div>            

  )
}
