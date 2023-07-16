import authController from "../controllers/authController.js";

import { Router } from "express"
import { body } from "express-validator";
const rout = new Router()

rout.post('/register', 
    body("password").isLength({min:4,max:32}),
    body("username").isLength({min:4,max:20}),
    authController.register)
rout.post('/login', authController.login)
rout.post('/logout', authController.logout )
rout.get('/refresh', authController.refresh)
rout.post('/acivate/:link', authController.activate)
rout.get("/image", authController.getImage)
export default rout 