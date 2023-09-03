import { svgMarkers } from "../components/Map";

export interface mapData{
    id:number;
    markers: svgMarkers[];
    mapImg:string;
    name:string;
    layers: {
        name:string;
        id:number;
        markers:svgMarkers[];
        mapImg:string;
    }[];
    secrets:string[]
}
export interface reduxStateMaps{
    id:number;
    maps:mapData[]
}
export interface saveMapLayerRes{
    id:number,
    map:{id:number,name:string,markers: svgMarkers[], mapImg:string, mapId:number}
}
export interface saveMap{
    mapId:number;
    markers:svgMarkers[];
    userId:number;
    mapImg:string;
    mapName:string;
    mapLayer:{
        name:string;
        id:number;
        markers:svgMarkers[]
    }[];
    secrets:string[]
}
export interface saveMapLayer{
    mapId:number;
    markers:svgMarkers[];
    userId:number;
    mapImg:string;
    mapName:string;
    mapLayerId: number
}