import { Router } from "express"
import UserController from "../controllers/userController.js"
import { body } from "express-validator";
const rout = new Router()

rout.post("/user/update",
    body("username").isLength({min:4,max:20}),
    body("email").isLength({min:8,max:30}),
    UserController.update)
rout.post("/user/getUserById", UserController.getUserById)
rout.post("/user/sendRequestToUser", UserController.sendRequestToUser)
rout.post("/user/getAllRequestsToUser", UserController.getAllRequestsToUser)
rout.post("/user/getAllFriendsToUser", UserController.getAllFriendsToUser)
rout.post("/user/deleteRequestToUser", UserController.deleteRequestToUser)
rout.post("/user/acceptRequestToUser", UserController.acceptRequestToUser)
export default rout