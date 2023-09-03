import React, { useEffect, useState } from 'react'
import { Details, markers, svgMarkers } from './Map';
import { Link } from 'react-router-dom';
import { Button } from './UI/Button/Button';
import { Modal } from './UI/Modal/Modal';
import { MapToolsBarInputs } from './MapToolsBarInputs';
interface props{
    isMarkers:svgMarkers[];
    setMarkers:(smth:svgMarkers[])=>void;
    isDetails:Details|null;
    setDetails:(smth:Details|null)=>void;
    editable: boolean;
}
export const MapViewDetails = ({isMarkers,setMarkers,isDetails,setDetails,editable}:props) => {
    const deleteMarker = (id:number)=>{ setMarkers(isMarkers.filter((a)=>a.id!==id)) }
    const [isModalVisible, setModalVisible] = useState(false)
    const [isUpdateMarker,setUpdateMarker] = useState<markers|null>(null)
    const updateMarker = (marker:markers,type:string) =>{
        const markers = isMarkers.map(a=>{
            if(a.id===isUpdateMarker?.id){
                const newMarker = {...a}
                newMarker.name = marker.name;
                newMarker.color = marker.color;
                newMarker.description = marker.description;
                newMarker.radius = marker.radius;
                newMarker.articleId = marker.articleId; 
                setDetails(newMarker)
                return newMarker
            }
            return a
        })
        setMarkers(markers)
        setUpdateMarker(null)
        setModalVisible(false)
    }
    useEffect(()=>{if(!isModalVisible)setUpdateMarker(null)},[isModalVisible])
  return (
    <>
    {isDetails&&
            <div className='MapPreviewDetails'>
                {isDetails.articleId==="none"?<h2>{isDetails.name}</h2>:<Link to={isDetails.articleId}>{isDetails.name}</Link>}    
                <p>{isDetails.description}</p>
                <Button onClick={()=>setDetails(null)}>❌</Button>
                {editable&&
                    <>
                        <div className='MapPreviewDetailsSettings'>
                            <button onClick={()=>{deleteMarker(isDetails.id); setDetails(null)}}><i className='DeleteMarker'></i></button>
                            <button onClick={()=>{setUpdateMarker(isDetails as markers); setModalVisible(true)}}><i className='MarkerSettings'></i></button>                    
                        </div>
                        <Modal visible={isModalVisible} setVisible={setModalVisible}>
                            {isUpdateMarker &&
                                <MapToolsBarInputs isActive={isUpdateMarker.type} updateMarker={isUpdateMarker} type='update' setCreatedMarker={updateMarker}/>
                            }
                            
                        </Modal>
                    </>}

            </div>
        }
    </>
  )
}
