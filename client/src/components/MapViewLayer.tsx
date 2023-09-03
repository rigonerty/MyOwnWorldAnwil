import React, { useState } from 'react'
import { Button } from './UI/Button/Button'
import { Dropdown } from './UI/DropDown/Dropdown'
import { Modal } from './UI/Modal/Modal'
import { Input } from './UI/Input/Input'
import { appUseDispatch } from '../hooks/reduxHooks'
import { SaveMapLayer } from '../store/maps'
import { mapData, saveMapLayer } from '../models/Map'
import { layer } from './MapView'
interface props{
    isMap: mapData|undefined;
    isLayer:number;
    setLayers:(smth:any)=>void
    onChangeMarkers:(smth:number)=>void;
    id:number|undefined
}
export const MapViewLayer = ({isMap,isLayer,onChangeMarkers,id,setLayers}:props) => {
    const [isLayerVisible, setLayerVisible] = useState(false)
    const [isLayerVisibleModal,setLayerVisibleModal] = useState(false)
    const [isFileValue,setFileValue] = useState<any>()
    const [isNameLayer,setNameLayer] = useState("")
    const dispatch = appUseDispatch()
    const createLayer = ()=>{
        if(isFileValue){
            const reader = new FileReader()
            reader.readAsDataURL(isFileValue[0])
            reader.onload = ()=>{
                const mapId = Math.round(Math.random()*10000000000000)
                const saveMapdata:saveMapLayer = {
                    mapId:isMap?.id||0,
                    markers:[],
                    userId:id||0,
                    mapImg:reader.result as string||"",
                    mapName:isNameLayer,
                    mapLayerId: mapId,
                }
                dispatch(SaveMapLayer(saveMapdata))     
                setLayers((a:layer[])=>{
                    const newLayers = a.slice()
                        newLayers.push({name:isNameLayer, id:mapId, markers:[]})
                    return newLayers
                })   
            }        
        }
       setLayerVisibleModal(false)
    }
  return (
        <div className='MapLayer'>
            <Button onClick={()=>setLayerVisible(!isLayerVisible)}>
                <i></i>
            </Button>
            <Dropdown visible={isLayerVisible} setVisible={setLayerVisible} side={true}>
                <div className='MapLayerInputs'>
                    <label htmlFor='MapDefault'>
                        <input type='radio' value={isMap?.id||0} onChange={(e)=>onChangeMarkers(+e.target.value)} name='layers' id='MapDefault' checked={isLayer===isMap?.id}/>
                        {isMap?.name}
                    </label>
                    
                    {isMap&& isMap.layers.length?
                        isMap.layers.map(a=>{
                            return <label htmlFor={"Layer"+a.id}>
                                <input type='radio' value={a.id} onChange={(e)=>onChangeMarkers(+e.target.value)} name='layers' id={"Layer"+a.id} checked={isLayer===a.id}/>
                                {a.name}
                                </label>
                        })
                        :<></>
                    }
                    <Button onClick={()=>setLayerVisibleModal(true)} style={{background:"#090909"}}>Загрузить</Button>
                    <Modal visible={isLayerVisibleModal} setVisible={setLayerVisibleModal}>
                        <Input name='Название карты' placeholder='Введите название карты' value={isNameLayer} setValue={setNameLayer}/>
                        <Input name='Загрузить карту' setValue={setFileValue} placeholder='' type='file'/>  
                        <Button onClick={createLayer}>Создать</Button> 
                    </Modal>
                </div>
            </Dropdown>
        </div>
  )
}
