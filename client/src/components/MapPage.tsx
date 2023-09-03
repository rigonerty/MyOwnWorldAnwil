import React, { useEffect } from 'react'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { Link, useParams } from 'react-router-dom'
import { getMaps } from '../store/maps'
import { mapData } from '../models/Map'

const MapPageItem = ({a}:{a:mapData})=>{
    return (
        <div>
            <Link to={`${a.id}`} className='mapPreview'>
                <img src={a.mapImg}/>
                <p>{a.name}</p>
            </Link>                            
        </div>
    )
}

export const MapPage = () => {
    const {userId} = useParams()
    const user = appUseSelector(state=>state.user)
    const maps = appUseSelector(state=>state.maps.find(a=>a.id+"" === userId))
    const dispatch = appUseDispatch()
    useEffect(()=>{
        if(userId)dispatch(getMaps({id:+userId}))
    }, [])
    const mapsLink = []
    if(maps)
    for(const a of maps?.maps){
        if(user.id === maps.id)
            mapsLink.push(<MapPageItem a={a}/>) 
        if(user.roles)
            for(const userRole of user.roles[1])
                if(a.secrets.find(b=>(b+" "+userId).includes(userRole)))
                    mapsLink.push(<MapPageItem a={a}/>) 
    } 
  return (
    <div className='MapPage'>
        <h1>Список карт:</h1>
        <div className='MapList'>
            {mapsLink.length?
                <>{mapsLink}</>
                :<h2>Карты отсутствуют или нет доступных</h2>
            }            
        </div>

    </div>
  )
}

