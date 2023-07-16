import { Router } from "express"
import UserController from "../controllers/userController.js"
import { body } from "express-validator";
const rout = new Router()

rout.post("/user/update",
    body("username").isLength({min:4,max:20}),
    body("email").isLength({min:8,max:30}),
    UserController.update)

export default rout