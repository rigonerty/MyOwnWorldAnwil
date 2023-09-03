import { AxiosResponse } from "axios";
import $api from "../http";
import { reduxStateMaps, saveMap, saveMapLayer, saveMapLayerRes } from "../models/Map";
export default class MapService{
    static async getMaps(id:{id:number}):Promise<AxiosResponse<reduxStateMaps>>{
        return $api.post<reduxStateMaps>("/map/getMaps", id)
    }
    static async saveMap(data:saveMap):Promise<AxiosResponse<reduxStateMaps>>{
        return $api.post<reduxStateMaps>("/map/saveMap", data)
    }
    static async saveMapLayer(data:saveMapLayer):Promise<AxiosResponse<saveMapLayerRes>>{
        return $api.post<saveMapLayerRes>("/map/saveMapLayer", data)
    }
    static async getLayerImage(data:{mapId:number,userId:number,mapLayerId:number}):Promise<AxiosResponse<string>>{
        return $api.post<string>("/map/getLayerImage", data)
    }

}