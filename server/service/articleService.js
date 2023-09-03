import fs from "fs"
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const path = require("path")
import { __dirname } from "../index.js";
import ApiError from "../exceptions/api-error.js";
class ArticleService{
    async createArticle(id, name,article, roles, secrets){
        const articles = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/articles.json")))
        const neededArticles = articles.find(a=>a.id===id) 
        if(!neededArticles){
            throw ApiError.BadRequest("Пользователь не найден.")
        }
        roles = roles.map(a=>a+" "+id)
        const idArticle = Math.floor(Math.random()*100000000000)
        neededArticles.articles.push({name,article,id:idArticle,roles,secrets})
        fs.writeFileSync(path.resolve(__dirname, "api/users/articles.json"), JSON.stringify(articles))
        return {name,article,id:idArticle,roles,secrets}        
    }
    async updateArticle(id, name,article, roles, secrets,idArticle){
        const articles = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/articles.json")))
        const neededArticles = articles.find(a=>a.id===id) 
        if(!neededArticles){
            throw ApiError.BadRequest("Пользователь не найден.")
        }
        const neededArticle = neededArticles.articles.find(a=>a.id===idArticle)
        if(!neededArticle){
            throw ApiError.BadRequest("Статья не найдена.")
        }
        neededArticle.name = name
        neededArticle.article = article
        neededArticle.secrets = secrets
        roles = roles.map(a=>a+" "+id)
        neededArticle.roles = roles
        fs.writeFileSync(path.resolve(__dirname, "api/users/articles.json"), JSON.stringify(articles))
        return {name,article,id,roles,secrets, idArticle} 
    }
    async getArticle(idUser,idArticle){
        const articles = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/articles.json")))
        const neededArticles= articles.find(a=> a.id===idUser)
        if(!neededArticles){
            throw ApiError.BadRequest("Пользователь не найден.")
        }
        const neededArticle = neededArticles.find(a=>a.id===idArticle)
        if(!neededArticle){
            throw ApiError.BadRequest("Статья не найдена.")
        }
        return {id:idUser,article:neededArticle}
    }
    async getAllArticles(id){
        const articles = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/articles.json")))
        const neededArticles= articles.find(a=> a.id===id)
        return neededArticles
    }
    async getRoles(id){
        const roles = JSON.parse(fs.readFileSync(path.resolve(__dirname,"api/users/roles.json")))
        const role = roles.find(a=>a.id === id)
        if(!role){
            throw ApiError.BadRequest("Пользователь не найден.")
        }
        return {role:role.roles}
    }
    async updateRoles(id, roles){
        const JSONroles = JSON.parse(fs.readFileSync(path.resolve(__dirname,"api/users/roles.json")))
        const role = JSONroles.find(a=> a.id===id)
        if(!role){
            throw ApiError.BadRequest("Пользователь не найден.")
        }
        role.roles[0] = roles
        fs.writeFileSync(path.resolve(__dirname, "api/users/roles.json"), JSON.stringify(JSONroles))
        return {role: role.roles}
    }
    async updateSomeRole(id,roles){
        const JSONroles = JSON.parse(fs.readFileSync(path.resolve(__dirname,"api/users/roles.json")))
        const role = JSONroles.find(a=> a.id===id)
        if(!role){
            throw ApiError.BadRequest("Пользователь не найден.")
        }
        const newArrRoles = []
        if(role.roles[1].length){
            for(const oldRoles of role.roles[1]){
                const arr = oldRoles.split(" ")
                for(const newRole of roles){
                    if(newRole.split(" ")[1] === arr[1]){
                        newArrRoles.push(newRole)
                    }else{
                        newArrRoles.push(newRole)
                        newArrRoles.push(oldRoles)
                    }
                }
            }                
        }else{ newArrRoles.push(...roles)}
        role.roles[1] = newArrRoles
        fs.writeFileSync(path.resolve(__dirname, "api/users/roles.json"), JSON.stringify(JSONroles))
    }
}

export default new ArticleService()