import React, { useEffect, useRef, useState } from 'react'
import { Input } from './UI/Input/Input'
import { Button } from './UI/Button/Button'
import { MapToolsBar } from './MapToolsBar'
import { MapMarkerList } from './MapMarkerList';
import { Link } from 'react-router-dom';
import { MapImgBlock } from './MapImgBlock';
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks';
import { SaveMap } from '../store/maps';
import { saveMap } from '../models/Map';
import { Select } from './UI/Select/Select';
export interface markers{
    name:string;
    description: string;
    type: string;
    id:number;
    radius?: number|string;
    color:string;
    arrOfXY?: string[];
    articleId:string
    lineWidth?:number
}
export interface svgMarkers {
    name:string;
    description: string;
    type: string;
    id:number;
    radius?: number|string;
    x:number;
    y:number;
    arrOfXY?:string[]
    color?: string;
    articleId:string;
    lineWidth?:number
}
export interface Details{
    name:string;
    description:string;
    articleId:string;
    id:number;
}
export const Map = () => {
    const [isMapChange,setMapChange] = useState<any>()
    const [isMap,setMap] = useState("")
    const [isScale,setScale] = useState(1)
    const [isMarkers, setMarkers] = useState<svgMarkers[]>([])
    const [isCreatedMarker, setCreatedMarker] = useState<markers|null>(null)
    const [isDetails, setDetails] = useState<Details|null>(null)
    const [isName, setName] = useState("")
    const roles = appUseSelector(state=>state.user.roles)
    const [isAccess,setAccess] = useState<string[]>(roles?roles[0]:[])
    const [isSave,setSave] = useState(false)
    const dispatch = appUseDispatch()
    const id = appUseSelector(state=>state.user.id)
    const FinishPutPolyMarker = ()=>{
        if(isCreatedMarker){
            setCreatedMarker(null)             
        }
    }
    const downloadHandler = ()=>{
        if(isMapChange){
            const reader = new FileReader()
            reader.readAsDataURL(isMapChange[0])
            reader.onload = ()=>{
                setMap(reader.result as string)
            }
        }
    }
    const resizeImg = (a:string)=>{
        if(a==="plus"){
            setScale(isScale+0.1)
        }else if(a==="minus"){
            if(isScale>0.5){
                setScale(isScale-0.1)
            }
            
        }
    }
    const saveMap = ()=>{
        const mapId = Math.round(Math.random()*10000000000000)
        const saveMapdata:saveMap = {
            mapId,
            markers:isMarkers,
            userId:id||0,
            mapImg:isMap,
            mapName:isName,
            mapLayer:[],
            secrets:isAccess
        }
        setSave(true)
        dispatch(SaveMap(saveMapdata))
    }
    const Secrets=(e:string)=>{
        if(roles){
        const newRoles = [] 
        let access = false
        for(const role of roles[0]){
            if(role ===e){
            access=true
            }  
            if(access) {
            newRoles.push(role)
            } 
        }      
        setAccess(newRoles)
        }
    }
  return (
    <div className='MapPage'>
        {!isMap&&
            <>
                <Input setValue={setMapChange} name='Карта' placeholder='Карта пользователя' type='file' />
                <Button onClick={downloadHandler}>Загрузить Карту</Button>
                <br/>        
            </>

        }
        {isMap &&
        
        <>
            <div className='mapSaveButton'>
                {!isSave&&<Button onClick={saveMap}>Сохранить</Button>}
            </div>
            <div>
                <Select onChange={(e)=>{Secrets(e.target.value)}}>
                    {roles&&roles[0].map((a,i)=>{
                    return <option value={a} key={i}>{a}</option>
                    })}
                </Select>
            </div>
            <Input placeholder='Введите название карты' value={isName} setValue={setName} name='Название карты'/>
            <div className='MapPageContent'>
                <div className='ImgResize'>
                    <Button onClick={()=>{resizeImg("plus")}}>+</Button>
                    <Button onClick={()=>{resizeImg("minus")}}>-</Button>            
                </div>
                <MapImgBlock 
                    isMap={isMap} 
                    isScale={isScale}
                    setCreatedMarker={setCreatedMarker}
                    isCreatedMarker={isCreatedMarker}
                    isMarkers={isMarkers}
                    setMarkers={setMarkers}
                    setDetails={setDetails}/>
                {isDetails&&
                    <div className='MapShowDetails'>
                        {isDetails.articleId==="none"?<h2>{isDetails.name}</h2>:<Link to={isDetails.articleId}>{isDetails.name}</Link>}
                        
                        <p>{isDetails.description}</p>
                        <Button onClick={()=>setDetails(null)}>❌</Button>
                    </div>
                }
                <MapToolsBar setCreatedMarker={setCreatedMarker} isCreatedMarker={isCreatedMarker} FinishPutPolyMarker={FinishPutPolyMarker}/>
                            
            </div>
            <MapMarkerList isMarkers={isMarkers} setMarkers={setMarkers}/>        
        </>

        }

    </div>
  )
}
