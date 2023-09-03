import React, { useEffect, useState } from 'react'
import { markers, svgMarkers } from './Map'
import { Modal } from './UI/Modal/Modal';
import { MapToolsBarInputs } from './MapToolsBarInputs';
interface props{
    isMarkers: svgMarkers[];
    setMarkers: (smth:svgMarkers[])=> void
}
export const MapMarkerList = ({isMarkers, setMarkers}:props) => {
    const deleteMarker = (id:number)=>{ setMarkers(isMarkers.filter((a)=>a.id!==id)) }
    const [isModalVisible, setModalVisible] = useState(false)
    const [isUpdateMarker,setUpdateMarker] = useState<markers|null>(null)
    const updateMarker = (marker:markers,type:string) =>{
        const markers = isMarkers.slice()
        const neededMarker = markers.find(a=> a.id=== isUpdateMarker?.id)
        if(neededMarker){
            neededMarker.name = marker.name
            neededMarker.color = marker.color
            neededMarker.description = marker.description
            neededMarker.radius = marker.radius
            neededMarker.articleId = marker.articleId
            setMarkers(markers)
            setUpdateMarker(null)
            setModalVisible(false)
        }
    }
    useEffect(()=>{if(!isModalVisible)setUpdateMarker(null)},[isModalVisible])
  return (
    <div className='MapMarkerList'>
        <div className='MapMarkerListItem'><p>Название</p><p>Тип</p><p>Настройки</p></div>
        {isMarkers.map(a=>{
            return (
                <div className='MapMarkerListItem'>
                    <p>{a.name}</p>
                    <p>{a.type}</p> 
                    <div>
                        <button onClick={()=>deleteMarker(a.id)}><i className='DeleteMarker'></i></button>
                        <button onClick={()=>{setUpdateMarker(a as markers); setModalVisible(true)}}><i className='MarkerSettings'></i></button>

                    </div>
                    <Modal visible={isModalVisible} setVisible={setModalVisible}>
                        {isUpdateMarker &&
                            <MapToolsBarInputs isActive={isUpdateMarker.type} updateMarker={isUpdateMarker} type='update' setCreatedMarker={updateMarker}/>
                        }
                        
                    </Modal>
                </div>)
        }).reverse()}
    </div>
  )
}
