import UserService from "../service/userService.js"
import {validationResult} from "express-validator"
import ApiError from "../exceptions/api-error.js";

class UserController{
    async update(req,res,next){
        try{
            const valid = validationResult(req)
            if(!valid.isEmpty()){
                throw next(ApiError.BadRequest("Ошибка при изминении профиля.",valid.array()))
            }
            const {username, email, password,newPassword, img, id} = req.body
            const resData = await UserService.update(username,email,password,newPassword,img,id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getUserById(req,res,next){
        try{
            const resData = await UserService.getUserById(req.body.id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async sendRequestToUser(req,res,next){
        try{
            const {id,idTo} = req.body
            const resData = await UserService.sendRequestToUser(id,idTo)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getAllRequestsToUser(req,res,next){
        try{
            const {id} = req.body
            const resData = await UserService.getAllRequestsToUser(id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getAllFriendsToUser(req,res,next){
        try{
            const {id} = req.body
            const resData = await UserService.getAllFriendsToUser(id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async deleteRequestToUser(req,res,next){
        try{
            const {id,idTo} = req.body
            await UserService.deleteRequestToUser(id,idTo)
            return res.json({})
        }catch(e){
            next(e)
        }
    }
    async acceptRequestToUser(req,res,next){
        try{
            const {id,idTo} = req.body
            const resData = await UserService.acceptRequestToUser(id,idTo)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
}

export default new UserController()