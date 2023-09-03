import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import MapService from '../services/MapService';
import axios from 'axios';
import { mapData, reduxStateMaps, saveMap, saveMapLayer } from '../models/Map';




const initialState:reduxStateMaps[] = []


export const mapsSlice = createSlice({
    name:"maps",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(SaveMap.fulfilled,(state,action)=>{
                const neededUser = state.find(a=>a.id === action.payload.data.id)
                if(neededUser){
                    const neededMap = neededUser.maps.find(a=>a.id === action.payload.data.maps[0].id)
                    if(neededMap){
                        neededMap.mapImg = action.payload.data.maps[0].mapImg;
                        neededMap.markers = action.payload.data.maps[0].markers;
                        neededMap.name = action.payload.data.maps[0].name;
                        neededMap.layers = action.payload.data.maps[0].layers
                    }else{
                        neededUser.maps.push(action.payload.data.maps[0])
                    }
                }else{
                    state.push(action.payload.data)
                }

            })
            .addCase(getMaps.fulfilled, (state,action)=>{
                const neededUser = state.find(a=>a.id===action.payload.data.id)
                if(neededUser){
                    neededUser.maps = action.payload.data.maps
                }else{
                    state.push(action.payload.data)
                }
            })
            .addCase(SaveMapLayer.fulfilled, (state,action)=>{
                const neededUser = state.find(a=>a.id === action.payload.data.id)
                if(neededUser){
                    const neededMap = neededUser.maps.find(a=>a.id === action.payload.data.map.mapId)
                    if(neededMap){
                        const neededMapLayer = neededMap.layers.find(a=>a.id ===action.payload.data.map.id)
                        if(!neededMapLayer){
                            neededMap.layers.push({name:action.payload.data.map.name, id:action.payload.data.map.id, markers:action.payload.data.map.markers, mapImg:action.payload.data.map.mapImg})
                        }
                    }
                }
            })
            .addCase(getLayerImage.fulfilled,(state,action)=>{
                const neededUser = state.find(a=>a.id===action.payload.info.userId)
                if(neededUser){
                    const neededMap = neededUser.maps.find(a=>a.id===action.payload.info.mapId)
                    if(neededMap){
                        const neededLayer = neededMap.layers.find(a=>a.id===action.payload.info.mapLayerId)
                        if(neededLayer){
                            neededLayer.mapImg = action.payload.data
                        }
                    }
                }
            })
    },
})

export const SaveMap = createAsyncThunk("maps/saveMap", async (data:saveMap)=>{
    const resData = await MapService.saveMap(data) 
    return {data:resData.data}
})
export const getMaps = createAsyncThunk("maps/getMap", async (id:{id:number})=>{
    const resData = await MapService.getMaps(id) 
    return {data:resData.data}
})
export const SaveMapLayer = createAsyncThunk("maps/saveMapLayer", async (data:saveMapLayer)=>{
    const resData = await MapService.saveMapLayer(data) 
    return {data:resData.data}
})
export const getLayerImage = createAsyncThunk("maps/getLayerImage", async (data:{mapId:number,userId:number,mapLayerId:number})=>{
    const resData = await MapService.getLayerImage(data) 
    return {data:resData.data, info:data}
})


export default mapsSlice.reducer