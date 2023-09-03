import React from 'react'
import { Button } from './UI/Button/Button';
interface props{
    isActive: string;
    setActive: (amth:string)=>void
}
export const MapToolsBarButtons = ({isActive,setActive}:props) => {
  return (
    <div className='ToolsForImgBlockButtons'>
        <Button onClick={()=> setActive("Pin")} style={isActive==="Pin"?{background:"#29292980"}:{}}>
            <i className='Pin'></i>
            Pin
        </Button>
        <Button onClick={()=> setActive("Circle")} style={isActive==="Circle"?{background:"#29292980"}:{}}>
            <i className='Circle'></i>
            Circle
        </Button>
        <Button onClick={()=> setActive("Line")} style={isActive==="Line"?{background:"#29292980"}:{}}>
            <i className='Line'></i>
            Line
        </Button>
        <Button onClick={()=> setActive("Polygon")} style={isActive==="Polygon"?{background:"#29292980"}:{}}>
            <i className='Polygon'></i>
            Polygon
        </Button>                    
    </div>
  )
}
