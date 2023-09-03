import React, { useEffect, useState } from 'react'
import { Details, markers, svgMarkers } from './Map'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { Button } from './UI/Button/Button'
import { MapImgBlock } from './MapImgBlock'
import { Link, useParams } from 'react-router-dom'
import { MapToolsBar } from './MapToolsBar'
import { Modal } from './UI/Modal/Modal'
import { MapToolsBarInputs } from './MapToolsBarInputs'
import { MapViewDetails } from './MapViewDetails'
import { Input } from './UI/Input/Input'
import { SaveMap, SaveMapLayer, getLayerImage } from '../store/maps'
import { saveMap, saveMapLayer } from '../models/Map';
import { Dropdown } from './UI/DropDown/Dropdown'
import { MapViewLayer } from './MapViewLayer'
import { Select } from './UI/Select/Select'
import { ChoseRoles } from './ChoseRoles'
import { SaveInfo } from './UI/SaveInfo/SaveInfo'
export interface layer{
    name:string;
    id:number;
    markers:svgMarkers[]
}
export const MapView = () => {
    const {userId,mapId} = useParams()
    const isMap = appUseSelector(state=>{
        const neededUser = state.maps.find(a=>a.id+""=== userId)
        return neededUser?.maps.find(a=>a.id+"" === mapId)
    })
    const user = appUseSelector(state=>state.user)
    const [isImage,setImage] = useState(isMap?isMap.mapImg:"")
    const [isNameChangeModal,setNameChangeModal] = useState(false)
    const [isScale,setScale] = useState(1)
    const [isMarkers, setMarkers] = useState<svgMarkers[]>(isMap?[...isMap.markers]:[])
    const [isCreatedMarker, setCreatedMarker] = useState<markers|null>(null)
    const [isDetails, setDetails] = useState<Details|null>(null)
    const [isName, setName] = useState(isMap?isMap.name:"")
    const [isLayer, setLayer] = useState(isMap?.id||0)
    const [isLayerMarkers,setLayerMarkers] = useState<svgMarkers[]>([])
    const [isLayerName,setLayerName] = useState("")
    const [isLayers, setLayers] = useState<layer[]>(isMap?isMap.layers:[])
    const [isAccess,setAccess] = useState(isMap?isMap.secrets:[])
    const [isSave,setSave] = useState(false)
    const dispatch = appUseDispatch()
    const resizeImg = (a:string)=>{
        if(a==="plus"){
            setScale(isScale+0.1)
        }else if(a==="minus"){
            if(isScale>0.5){
                setScale(isScale-0.1)
            }
            
        }
    }
    const FinishPutPolyMarker = ()=>{
        if(isCreatedMarker){
            setCreatedMarker(null)             
        }
    }
    const saveMap = ()=>{
        const Layers = isLayers.slice()
        if(isMap&&isLayer!==isMap.id){
            const Markers = isLayerMarkers.slice()
            const neededLayer = Layers.find(x=>x.id===isLayer)
            if(neededLayer){
                neededLayer.markers = Markers
                neededLayer.name = isLayerName
                setLayers(Layers)
            }
        }
        const validLayers = Layers.map(a=>{
            const layer = {name: a.name,id:a.id,markers:a.markers};
            return layer
        })
        const saveMapdata:saveMap = {
            mapId:isMap?.id||0,
            markers:isMarkers,
            userId:userId?+userId:0,
            mapImg:isMap?.mapImg||"",
            mapName:isName,
            mapLayer: validLayers,
            secrets:isAccess
        }
        dispatch(SaveMap(saveMapdata))
        setSave(true)
        setTimeout(()=>{
            setSave(false)
        },3000)
    }

    const onChangeMarkers = (a:number)=>{
        if(isMap&& a!==isMap.id){
            const prevId = isLayer
            const prevMarkers = isLayerMarkers.slice()
            const oldLayers = isLayers.map(a=>{
                if(a.id===prevId){
                    const newLayer = {...a}
                    newLayer.markers=prevMarkers
                    newLayer.name = isLayerName
                    return newLayer
                }
                return a
            })
            setLayers(oldLayers)          
            const neededLayer = isLayers.slice().find(x=>x.id===a)
            if(neededLayer){
                setLayer(a)
                setLayerMarkers(neededLayer.markers)
                setLayerName(neededLayer.name)
            }
        }else{
            const prevId = isLayer
            const prevMarkers = isLayerMarkers.slice()
            const oldLayers = isLayers.map(a=>{
                if(a.id===prevId){
                    const newLayer = {...a}
                    newLayer.markers=prevMarkers
                    newLayer.name = isLayerName
                    return newLayer
                }
                return a
            })
            setLayers(oldLayers)
            setLayer(a)
        }
    }
    useEffect(()=>{
        if(isMap&&isLayer!==isMap.id){
            const neededLayer = isMap.layers.find(a=>a.id===isLayer)
            if(neededLayer && !neededLayer?.mapImg){
                dispatch(getLayerImage({mapId:isMap.id,userId:userId?+userId:0,mapLayerId:isLayer}))
            }else if(neededLayer){
                setImage(neededLayer.mapImg)
            }
        }else if(isMap){
            setImage(isMap.mapImg)
        }
    },[isLayer])
  return (
    <div className='MapView'>
        <div className='ImgResize'>
            <Button onClick={()=>{resizeImg("plus")}}>+</Button>
            <Button onClick={()=>{resizeImg("minus")}}>-</Button>        
        </div>
        <SaveInfo isActive={isSave} text="Данные были отправлены на сервер."/>
        <MapViewLayer isMap={isMap} isLayer={isLayer} onChangeMarkers={onChangeMarkers} id={userId?+userId:0} setLayers={setLayers}/>
        {user.id == userId&&<ChoseRoles isAccess={isAccess} setAccess={setAccess}/>}
        <h1>
            {isLayer!==isMap?.id?isLayerName:isName}
            {user.id == userId&&
            <>
                <Button 
                    style={{padding:".2em", fontSize:".45em",marginLeft:"1em",borderRadius:".2em"}}
                    onClick={()=>setNameChangeModal(true)}>🖊</Button>
                <Modal visible={isNameChangeModal} setVisible={setNameChangeModal}>
                    <Input name="Название карты" placeholder='Введите новое название карты' value={isLayer!==isMap?.id?isLayerName:isName} setValue={isLayer!==isMap?.id?setLayerName:setName} max={50}/>
                </Modal>              
            </>
              
            }

        </h1>
        {user.id == userId&&<Button onClick={saveMap} style={{position:"fixed", top:"15%",zIndex:"1"}}>Сохранить</Button>}
        <MapImgBlock 
            isMap={isImage} 
            isScale={isScale}
            setCreatedMarker={setCreatedMarker}
            isCreatedMarker={isCreatedMarker}
            isMarkers={isLayer!==isMap?.id?isLayerMarkers:isMarkers}
            setMarkers={isLayer!==isMap?.id?setLayerMarkers:setMarkers}
            setDetails={setDetails}
            isBlockHeight='100vh'
            isBlockWidth='100%'/>
        {user.id == userId&&
            <MapToolsBar 
                setCreatedMarker={setCreatedMarker} 
                isCreatedMarker={isCreatedMarker} 
                FinishPutPolyMarker={FinishPutPolyMarker}
                isFloat={true}/>        
        }

        <MapViewDetails isMarkers={isLayer!==isMap?.id?isLayerMarkers:isMarkers} setMarkers={isLayer!==isMap?.id?setLayerMarkers:setMarkers} isDetails={isDetails} setDetails={setDetails} editable={user.id == userId}/>
    </div>
  )
}
