import jwt from "jsonwebtoken"
import TOKEN from "../config.js"
import fs from "fs"
import { __dirname } from "../index.js";
import path from "path"
class TokenService{
    validAccessToken(token){
        try{
            const userData = jwt.verify(token, TOKEN.secretAccessToken)
            return userData
        }catch(e){
            return null
        }
    }
    validRefreshToken(token){
        try{
            const userData = jwt.verify(token, TOKEN.secretRefreshToken)
            return userData
        }catch(e){
            return null            
        }
    }
    generateTokens(payload){
        const accessToken = jwt.sign(payload, TOKEN.secretAccessToken, {expiresIn:"1h"})
        const refreshToken = jwt.sign(payload, TOKEN.secretRefreshToken, {expiresIn:"10d"})
        return {
            accessToken, refreshToken
        }
    }
    async saveToken(userId, refreshToken){
        const tokens = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/tokens.json")))
        const token = tokens.find(a=>a.id === userId)
        if(!token){
            tokens.push({id:userId, refreshToken})
        }else{
            token.refreshToken = refreshToken   
        }    
        fs.writeFileSync(path.resolve(__dirname, "api/users/tokens.json"), JSON.stringify(tokens))
        
    }
    async deleteToken(refreshToken){
        const tokens = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/tokens.json")))
        const token = tokens.find(a=>a.refreshToken === refreshToken)
        token.refreshToken = ""
        fs.writeFileSync(path.resolve(__dirname, "api/users/tokens.json"), JSON.stringify(tokens))
    }
    async findToken(refreshToken){
        const tokens = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/tokens.json")))
        const token = tokens.find(a=>a.refreshToken === refreshToken)
        return token
    }
}



export default new TokenService()