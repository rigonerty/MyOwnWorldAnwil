import { AxiosResponse } from "axios";
import $api from "../http";
import { getArticleById, getArticlesById, roles, updateArticle } from "../models/Tools";
export default class ToolsService{
    static async getArticle(data:{idUser:number,idArticle:number}):Promise<AxiosResponse<getArticleById>>{
        return $api.post<getArticleById>("/tools/getArticle", data)
    }
    static async updateArticle(data:updateArticle):Promise<AxiosResponse<updateArticle>>{
        return $api.post<updateArticle>("tools/updateArticle",data)
    }
    static async getAllArticles(data:{id:number}):Promise<AxiosResponse<getArticlesById>>{
        return $api.post<getArticlesById>("/tools/getAllArticles", data)
    }
    static async getRoles(id:{id:number}):Promise<AxiosResponse<roles>>{
        return $api.post<roles>("/tools/getRoles", id)
    }
    static async updateRoles(data:{id:number,roles:string[]}):Promise<AxiosResponse<roles>>{
        return $api.post<roles>("/tools/updateRoles", data)
    }
    static async updateSomeRole(data:{id:number,roles:string[]}):Promise<void>{
        $api.post<roles>("/tools/updateSomeRole", data)
    }
}