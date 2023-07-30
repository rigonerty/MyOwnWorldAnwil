
import ArticleService from "../service/articleService.js";

class toolsController{
    async createArticle(req,res,next){
        try{
            const {id, name,article} = req.body
            const resData = await ArticleService.createArticle(id,name,article)
            return res.json(resData)
        }catch(e){
            next(e)
        }
    }
}

export default new toolsController()