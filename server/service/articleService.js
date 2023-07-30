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
class ArticleService{
    async createArticle(id, name,article){
        const articles = JSON.parse(fs.readFileSync(path.resolve(__dirname, "api/users/articles.json")))
        const neededArticles = articles.find(a=>a.id===id) 
        if(!neededArticles){
            throw ApiError.BadRequest("Пользователь не найден")
        }
        neededArticles.articles.push({name,article})
        fs.writeFileSync(path.resolve(__dirname, "api/users/articles.json"), JSON.stringify(articles))
        return {name,article}        
    }

}

export default new ArticleService()