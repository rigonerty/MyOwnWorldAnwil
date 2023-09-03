import MapService from "../service/mapService.js"

class mapController{
    async getMaps(req,res, next){
        try{
            const {id} = req.body
            const resData = await MapService.getMaps(id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async saveMap(req,res, next){
        try{
            const {mapId, markers,userId,mapImg,mapName,mapLayer,secrets} = req.body
            const resData = await MapService.saveMap(mapId, markers,userId,mapImg,mapName,mapLayer,secrets)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async saveMapLayer(req,res, next){
        try{
            const {mapId, markers,userId,mapImg,mapName,mapLayerId} = req.body
            const resData = await MapService.saveMapLayer(mapId, markers,userId,mapImg,mapName,mapLayerId)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    } 
    async getLayerImage(req,res, next){
        try{
            const {mapId,userId,mapLayerId} = req.body
            const resData = await MapService.getLayerImage(mapId,userId,mapLayerId)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }    
}

export default new mapController()