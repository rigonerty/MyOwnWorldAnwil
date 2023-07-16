import TOKEN from "../config.js"
import jwt from "jsonwebtoken"

export const roleMiddleware = (roles)=>{
    return (req,res,next)=>{
        if(req.method == "OPTIONS"){
            next()
        }
        try{
            const token = req.headers.authorization.split(" ")[1]
            console.log(token)
            if(!token){
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const {role} = jwt.verify(token,TOKEN.secretAccessToken)
            if(role !==roles){
                return res.status(403).json({message:"У вас нет прав для данного действия."})
            }
            next()
        }catch(e){
            console.log(e)
            return res.status(403).json({message: "Произошла ошибка при проверке прав."})
        }
    }
}