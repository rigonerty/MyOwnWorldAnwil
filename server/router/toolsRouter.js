import { Router } from "express"
import { roleMiddleware } from "../middlewares/roleMiddleware.js"
import toolsController from "../controllers/toolsController.js"

const rout = new Router()

rout.post("/createArticle", roleMiddleware("User"), toolsController.createArticle)

export default rout