import fs from "fs"
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const path = require("path")
import { __dirname } from "../index.js";
import ApiError from "../exceptions/api-error.js";
class MapService{
    async getImage(mapId,userId){
        let file;
        if(fs.existsSync(path.resolve(__dirname, "api/imgs", userId+"_"+ mapId + ".jpg"))){
            file = fs.readFileSync(path.resolve(__dirname, "api/imgs", userId+"_"+ mapId+ ".jpg"))
        }
        const data = "data:image/jpg;base64," + file.toString("base64")
        return data
    }
    async getMaps(id){
        const maps = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/map.json")))
        const neededMaps = maps.find(a=>a.id===id)
        if(!neededMaps){
            throw ApiError.BadRequest("Пользователь не был найден.")
        }
        
        const data = []
        for(const map of neededMaps.maps){
            const mapImg = await this.getImage(map.id,id)
            data.push({...map, mapImg})
        }
        return {id, maps:data}
    }
    async saveMap(mapId, markers,userId, mapImg, mapName,mapLayer,secrets){
        const maps = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/map.json")))
        const neededMaps = maps.find(a=>a.id===userId)
        if(!neededMaps){
            throw ApiError.BadRequest("Пользователь не был найден.")
        }
        const neededMap = neededMaps.maps.find(a=>a.id===mapId)
        if(!neededMap){
            neededMaps.maps.push({id:mapId, markers, name:mapName,layers:mapLayer,secrets})
            const valid = mapImg.slice(9,18)
            if(!valid.search(/jpeg|png|jpg|webp/)){
                return ApiError.BadRequest("Тип файла не поддерживается.")
            }
            const format = valid.match(/jpeg|png|jpg|webp/)
            const image = mapImg.replace("data:image/"+format[0]+";base64,", "")
            fs.writeFileSync(path.resolve(__dirname, "api/imgs/"+userId+"_"+mapId+".jpg"), image, "base64") 
        }else{
            neededMap.markers = markers
            neededMap.layers = mapLayer
            neededMap.secrets = secrets
        }
        fs.writeFileSync(path.resolve(__dirname, "api/users/map.json"), JSON.stringify(maps))
        return {id:userId,maps:[{...neededMap, mapImg}]}
    }
    async saveMapLayer(mapId, markers,userId, mapImg, mapName,mapLayerId){
        const maps = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/map.json")))
        const neededMaps = maps.find(a=>a.id===userId)
        if(!neededMaps){
            throw ApiError.BadRequest("Пользователь не был найден.")
        }
        const neededMap = neededMaps.maps.find(a=>a.id===mapId)
        if(!neededMap){
            throw ApiError.BadRequest("Карта не был найдена.")

        }
        const neededLayer = neededMap.layers.find(a=>a.id===mapLayerId)
        if(!neededLayer){
            
            neededMap.layers.push({id:mapLayerId,name:mapName,markers})
            const valid = mapImg.slice(9,18)
            if(!valid.search(/jpeg|png|jpg|webp/)){
                return ApiError.BadRequest("Тип файла не поддерживается.")
            }
            const format = valid.match(/jpeg|png|jpg|webp/)
            const image = mapImg.replace("data:image/"+format[0]+";base64,", "")
            fs.writeFileSync(path.resolve(__dirname, "api/imgs/"+userId+"_"+mapId+"_"+mapLayerId+".jpg"), image, "base64")             
        }else{
            neededLayer.markers = markers
            neededLayer.name = mapName
        }
        fs.writeFileSync(path.resolve(__dirname, "api/users/map.json"), JSON.stringify(maps))
        return {id:userId,map:{id:mapLayerId,name:mapName,markers, mapImg, mapId}}
    }
    async getLayerImage(mapId,userId,mapLayerId){
        let file;
        if(fs.existsSync(path.resolve(__dirname, "api/imgs", userId+"_"+ mapId+"_"+mapLayerId + ".jpg"))){
            file = fs.readFileSync(path.resolve(__dirname, "api/imgs", userId+"_"+ mapId+"_"+mapLayerId + ".jpg"))
        }
        const data = "data:image/jpg;base64," + file.toString("base64")
        return data
    }
}

export default new MapService()