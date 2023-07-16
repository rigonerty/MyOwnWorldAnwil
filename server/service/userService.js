import fs from "fs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createRequire } from 'node:module';
import tokenService from "../service/tokenService.js";
const require = createRequire(import.meta.url);
const path = require("path")
import { __dirname } from "../index.js";
import ApiError from "../exceptions/api-error.js";
import TOKEN from "../config.js";
class UserService{
    async register(body){
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/users.json")))
        const {username, password, email} = body
        const condidate = users.find(a=> a.username === username || a.email ===email)
        if(condidate){
            throw ApiError.BadRequest("Такое Имя или почта уже существует")
        }
        const hashPassword = bcrypt.hashSync(password,7)
        const user = {username, password:hashPassword, id:Math.round(Math.random()*1000000000000), role: "User", email}
        users.push(user)
        fs.writeFileSync(path.resolve(__dirname, "api/users/users.json"), JSON.stringify(users))
        const tokens = tokenService.generateTokens({id:user.id,role:user.role,email})
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:{id:user.id,email:user.email,username:user.username}}
    }
    async login(body){
        const {username, password, email} = body
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/users.json")))
        const user = users.find(a=>a.username===username)
        if(!user){
            return ApiError.BadRequest("Имя или пароль введены неверно.")
        }
        const validPassword = bcrypt.compareSync(password,user.password)
        if(!validPassword){
            return ApiError.BadRequest("Имя или пароль введены неверно.")
        }
        const tokens = tokenService.generateTokens({id:user.id,role:user.role,email})
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:{id:user.id,email:user.email,username:user.username}}
    }
    async logout(refreshToken){
        await tokenService.deleteToken(refreshToken)
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnAuthorizedError()
        }
        const validToken = tokenService.validRefreshToken(refreshToken)
        const neededToken = await tokenService.findToken(refreshToken)
        if(!validToken || !neededToken){
            throw ApiError.UnAuthorizedError()
        }
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/users.json")))
        const user = users.find(a=>a.id===neededToken.id)
        const tokens = tokenService.generateTokens({id:user.id,role:user.role,email:user.email})
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user:{id:user.id,email:user.email,username:user.username}}
    }
    async getImage(id){
        let file;
        if(!fs.existsSync(path.resolve(__dirname, "api/imgs", id + ".jpg"))){
            file = fs.readFileSync(path.resolve(__dirname, "api/imgs", "default" + ".jpg"))
        }else{
            file = fs.readFileSync(path.resolve(__dirname, "api/imgs", id + ".jpg")) 
        }
        const data = "data:image/jpg;base64," + file.toString("base64")
        return data
    }
    async update(username, email, password=null,newPassword=null, img=null,id){
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/users.json")))
        const user = users.find(a=>a.id===id)
        user.username = username
        user.email = email
        if(password && newPassword){
            const validPassword = bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return ApiError.BadRequest("пароль введен неверно.")
            }
            const hashPassword = bcrypt.hashSync(newPassword,7)
            user.password = hashPassword            
        }

        if(img){
            const valid = img.slice(9,18)
            if(!valid.search(/jpeg|png|jpg|webp/)){
                return ApiError.BadRequest("Тип файла не поддерживается.")
            }
            const image = img.replace("data:image/jpeg;base64,", "")
            fs.writeFileSync(path.resolve(__dirname, "api/imgs/"+id+".jpg"), image, "base64")            
        }
        fs.writeFileSync(path.resolve(__dirname, "api/users/users.json"), JSON.stringify(users))
        return {username, email, img}
    }
}

export default new UserService()