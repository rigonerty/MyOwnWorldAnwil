import {validationResult} from "express-validator"
import { __dirname } from "../index.js";
import userService from "../service/userService.js";
import ApiError from "../exceptions/api-error.js";
class authController{
    async register(req,res, next){
        try{
            const valid = validationResult(req)
            if(!valid.isEmpty()){
                throw next(ApiError.BadRequest("Ошибка при регистации.",valid.array()))
            }
            const userData = await userService.register(req.body)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 240*60*60*1000, httpOnly:true})
            return res.json({...userData})
        }catch(e){
            next(e)
        }
    }
    async login(req,res,next){
        try{
            const userData = await userService.login(req.body)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 240*60*60*1000, httpOnly:true})
            return res.json({...userData})
        }catch(e){
            next(e)
        }
    }
    async refresh(req,res,next){
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 240*60*60*1000, httpOnly:true})
            return res.json(userData)
        }catch(e){
            next(e)
        }
    }
    async activate(req,res,next){
        try{

        }catch(e){
            next(e)
        }
    }
    async logout(req,res,next){
        try{
            const {refreshToken} = req.cookies;
            await userService.logout(refreshToken)
            res.clearCookie("refreshToken")
            return res.status(200)
        }catch(e){
            next(e)
        }
    }
    async users(req,res,next){
        try{

        }catch(e){
            next(e)
        }
    }
    async getImage(req,res,next){
    try{
        const data = await userService.getImage(req.query.id)
        return res.json(data)
    }catch(e){
        next(e)
    }
}
}

export default new authController()