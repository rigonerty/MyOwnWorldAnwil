
import ArticleService from "../service/articleService.js";

class toolsController{
    async createArticle(req,res,next){
        try{
            const {id, name,article,roles,secrets} = req.body
            const resData = await ArticleService.createArticle(id,name,article,roles,secrets)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getArticle(req,res,next){
        try{
            const {idUser,idArticle} = req.body
            const resData = await ArticleService.getArticle(idUser,idArticle)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getAllArticles(req,res,next){
        try{
            const {id} = req.body
            const resData = await ArticleService.getAllArticles(id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async getRoles(req,res,next){
        try{
            const {id} = req.body
            const resData = await ArticleService.getRoles(id)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async updateRoles(req,res,next){
        try{
            const {id,roles} = req.body
            const resData = await ArticleService.updateRoles(id,roles)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
    async updateSomeRole(req,res,next){
        try{
            const {id,roles} = req.body
            await ArticleService.updateSomeRole(id,roles)
            return res.json()
        }catch(e){
            next(e)
        }
    }
}

export default new toolsController()