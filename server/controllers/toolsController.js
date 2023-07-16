


class toolsController{
    async createArticle(req,res){
        try{
            console.log("ddd")
        }catch(e){
            console.log(e)
            return res.status(400).json({message: "Ошибка при создании статьи."})
        }
    }
}

export default new toolsController()