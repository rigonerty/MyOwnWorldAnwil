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
}

export default new UserController()