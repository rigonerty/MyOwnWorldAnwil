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
        const roles = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/roles.json")))
        const articles = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/articles.json")))
        const maps = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/map.json")))

        const hashPassword = bcrypt.hashSync(password,7)
        const id = Math.round(Math.random()*1000000000000)
        const user = {username, password:hashPassword, id, role: "User", email}

        users.push(user)
        roles.push({id, roles:[["Крестьянин","Купец","Боярин","Князь"],[]]})
        articles.push({id,articles:[]})
        maps.push({id,maps:[]})


        fs.writeFileSync(path.resolve(__dirname, "api/users/users.json"), JSON.stringify(users))
        fs.writeFileSync(path.resolve(__dirname, "api/users/roles.json"), JSON.stringify(roles))
        fs.writeFileSync(path.resolve(__dirname, "api/users/articles.json"), JSON.stringify(articles))
        fs.writeFileSync(path.resolve(__dirname, "api/users/map.json"), JSON.stringify(maps))
        
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
            const format = valid.match(/jpeg|png|jpg|webp/)
            const image = img.replace("data:image/"+format[0]+";base64,", "")
            fs.writeFileSync(path.resolve(__dirname, "api/imgs/"+id+".jpg"), image, "base64")            
        }
        fs.writeFileSync(path.resolve(__dirname, "api/users/users.json"), JSON.stringify(users))
        return {username, email, img}
    }
    async getUserById(id){
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/users.json")))
        const usersRoles = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/roles.json")))
        const user = users.find(a=>a.id===id)
        const userRoles = usersRoles.find(a=>a.id===id)
        if(!user&&userRoles){
            return ApiError.BadRequest("Такого пользователя не существует")
        }
        const getImage = await this.getImage(id)
        return {username:user.username,email:user.email,id:user.id, img:getImage,roles:userRoles.roles}
    }
    async sendRequestToUser(id,idTo){
        const friends = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/friends.json")))
        console.log(friends)
        if(friends.length){
            const condidate = friends.find(a=> a.sender == id, a.requestTo == idTo)
            if(condidate){
                return ApiError.BadRequest("Запрос уже был отправлен или принят.")
            }            
        }
        friends.push({sender: id, requestTo:idTo, accept: false})
        fs.writeFileSync(path.resolve(__dirname, "api/users/friends.json"), JSON.stringify(friends))
        return {sender: id, requestTo:idTo, accept: false}
    }
    async getAllRequestsToUser(id){
        const friends = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/friends.json")))
        const result = friends.filter(a=> a.requestTo == id && a.accept == false)
        const resultData = []
        for(const friend of result){
            const user = await this.getUserById(friend.sender)
            resultData.push(user)
        }
        return resultData
    }
    async getAllFriendsToUser(id){
        const friends = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/friends.json")))
        const result = friends.filter(a=> (a.requestTo == id||a.sender == id) && a.accept == true)
        const resultData = []
        for(const friend of result){
            let user;
            if(id === friend.sender){
                user = await this.getUserById(friend.requestTo)
            }else{
                user = await this.getUserById(friend.sender)
            }
            
            resultData.push(user)
        }
        return resultData
    }
    async deleteRequestToUser(id,idTo){
        const friends = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/friends.json")))
        const FilteredRequest = friends.filter(a=> a.sender!==id&&a.requestTo!==idTo)
        fs.writeFileSync(path.resolve(__dirname, "api/users/friends.json"), JSON.stringify(FilteredRequest))
    }
    async acceptRequestToUser(id,idTo){
        const friends = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/friends.json")))
        const neededRequest = friends.find(a=> a.sender ==id&&a.requestTo ==idTo)
        console.log(neededRequest, id, idTo)
        neededRequest.accept = true
        fs.writeFileSync(path.resolve(__dirname, "api/users/friends.json"), JSON.stringify(friends))
        return neededRequest
    }
}

export default new UserService()