import { Router } from "express"
import { roleMiddleware } from "../middlewares/roleMiddleware.js"
import mapController from "../controllers/mapController.js"

const rout = new Router()

rout.post("/getMaps",  mapController.getMaps)
rout.post("/saveMap",  mapController.saveMap)
rout.post("/saveMapLayer",  mapController.saveMapLayer)
rout.post("/getLayerImage",  mapController.getLayerImage)
export default rout