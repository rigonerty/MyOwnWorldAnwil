import React, { useEffect, useState } from 'react'
import { Details, markers, svgMarkers } from './Map';

interface props{
    isScale: number;
    setCreatedMarker: (markers:markers|null)=> void;
    isCreatedMarker:markers|null;
    isMarkers:svgMarkers[];
    setMarkers:(smth:svgMarkers[])=>void;
    setDetails:(smth:Details|null)=>void;
    isMap:string;
    isBlockWidth?:string;
    isBlockHeight?:string;
}

export const MapImgBlock = ({isScale,setCreatedMarker,isCreatedMarker,isMarkers,setMarkers,setDetails,isMap, isBlockHeight,isBlockWidth}:props) => {
    const [isDrag,setDrag] = useState(false)
    const [isPosition, setPosition] = useState({startX:0,startY:0})
    const [isLeft,setLeft] = useState(0)
    const [isTop,setTop] = useState(0)
    const [isWidth,setWidth] = useState(300)
    const [isHeight,setHeight] = useState(300)

    const findXAndY = (e:React.MouseEvent)=>{
        const leftEl = document.querySelector(".imgBlock > svg")?.getBoundingClientRect().left||0
        const topEl = document.querySelector(".imgBlock > svg")?.getBoundingClientRect().top ||0
        const x = Math.abs(Math.floor((leftEl - e.clientX)/isScale))
        const y = Math.abs(Math.floor((topEl-e.clientY)/isScale))
        return [x,y]
    }
    const wherePutMarker = (e:React.MouseEvent)=>{
        const XAndY = findXAndY(e)
        if(isCreatedMarker){
            const markers = isMarkers.slice()
            markers.push({...isCreatedMarker,x:XAndY[0],y:XAndY[1]})
            setMarkers(markers)
            setCreatedMarker(null)            
        }

    }
    const PutPolyMarker = (e:React.MouseEvent)=>{
        if(isCreatedMarker){
            const XAndY = findXAndY(e)
            const markers = isMarkers.slice()
            const neededMarker = markers.find(a=>a.id===isCreatedMarker.id)
            if(neededMarker&& neededMarker.arrOfXY){
                neededMarker.arrOfXY.push(`${XAndY[0]},${XAndY[1]}`)
            }else{
                markers.push({...isCreatedMarker, arrOfXY: [`${XAndY[0]},${XAndY[1]}`],x:0,y:0})
            }
            setMarkers(markers)
        }
    }
    const moveImageHandler = (e:React.MouseEvent)=>{
        e.preventDefault()
        if(isDrag){
            const newLeft = isLeft + (e.clientX - isPosition.startX)
            const newTop = isTop + (e.clientY-isPosition.startY)
            const parentWidth = document.querySelector(".imgBlock")?.getBoundingClientRect().width||0
            const parentHeight = document.querySelector(".imgBlock")?.getBoundingClientRect().height||0
            const imgWidth = document.querySelector(".imgBlock > img")?.getBoundingClientRect().width||0
            const imgHeight = document.querySelector(".imgBlock > img")?.getBoundingClientRect().height||0
            setLeft(newLeft<0&&(Math.abs(newLeft-parentWidth)<Math.floor(imgWidth))?newLeft:isLeft)
            setTop(newTop<0&&(Math.abs(newTop-parentHeight)<Math.floor(imgHeight))?newTop:isTop)
            setPosition({startX:e.clientX,startY:e.clientY})
        }
    }
    useEffect(()=>{
        setWidth(document.querySelector(".imgBlock > img")?.getBoundingClientRect().width||300)
        setHeight(document.querySelector(".imgBlock > img")?.getBoundingClientRect().height||300)
    }, [isMap])
    useEffect(()=>{
        setLeft(-500)
        setTop(-500)
    },[isScale])
  return (
    <div className='imgBlock' 
        style={isBlockHeight&&isBlockWidth?{width:isBlockWidth,height:isBlockHeight}:{}}
        onMouseDown={(e)=>{ setPosition({startX:e.clientX,startY:e.clientY});setDrag(true)}} 
        onMouseOut={()=>{setDrag(false)}} 
        onMouseUp={()=>{setDrag(false)}}
        onMouseMove={(e)=>moveImageHandler(e)}>
            <img src={isMap} style={{top:isTop,left:isLeft, transform:`scale(${isScale})`}}/>
            <svg onClick={isCreatedMarker?.type==="Line"|| isCreatedMarker?.type==="Polygon"?PutPolyMarker:wherePutMarker} width={isWidth} height={isHeight} style={{top:isTop,left:isLeft, transform:`scale(${isScale})`}}>
                {isMarkers.map(a=>{
                    if(a.type ==="Circle")
                        return <circle cx={a.x} cy={a.y} r={a.radius} fill={a.color||"blue"} key={a.id} onClick={()=>setDetails(a)}/>
                    if(a.type==="Pin") 
                        return <image x={a.x-27} y={a.y-55} xlinkHref='https://lutakome.com/wp-content/uploads/2018/11/location_pin_gps-512-1-e1541582714165.png' onClick={()=>setDetails(a)}/>
                    if(a.type==="Line") 
                        return <polyline points={a.arrOfXY?.join(" ")} stroke={a.color||"black"} stroke-width={a.lineWidth} fill='none' onClick={()=>setDetails(a)}/>
                    if(a.type==="Polygon") 
                        return <polygon points={a.arrOfXY?.join(" ")} fill={a.color||"blue"} onClick={()=>setDetails(a)}/>
                    return <></>
                })
                }
            </svg>

    </div>
  )
}
