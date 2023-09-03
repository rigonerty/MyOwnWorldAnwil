import { Router } from "express"
import { roleMiddleware } from "../middlewares/roleMiddleware.js"
import toolsController from "../controllers/toolsController.js"

const rout = new Router()

rout.post("/createArticle",  toolsController.createArticle)
rout.post("/getArticle",  toolsController.getArticle)
rout.post("/updateArticle",  toolsController.updateArticle)
rout.post("/getAllArticles",  toolsController.getAllArticles)
rout.post("/getRoles",  toolsController.getRoles)
rout.post("/updateRoles",  toolsController.updateRoles)
rout.post("/updateSomeRole",  toolsController.updateSomeRole)

export default rout