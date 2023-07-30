import { AxiosResponse } from "axios";
import { update,createArticle, requestToAddFriend, responseToAddFriend } from "../models/User";
import $api from "../http";
import { getUserByIdData } from "../store/users";


export default class UserService{
    static async update(update:update):Promise<AxiosResponse<update>>{
        return $api.post<update>("/user/update", update)
    }
    static async createArticle(createArticle:createArticle):Promise<AxiosResponse<createArticle>>{
        return $api.post<createArticle>("/tools/createArticle", createArticle)
    }
    static async getUserById(id:{id:number}):Promise<AxiosResponse<getUserByIdData>>{
        return $api.post<getUserByIdData>("/user/getUserById", id)
    }
    static async sendRequestToUser(request: requestToAddFriend):Promise<AxiosResponse<responseToAddFriend>>{
        return $api.post<responseToAddFriend>("/user/sendRequestToUser",request)
    }
    static async getAllRequestsToUser(id:{id:number}):Promise<AxiosResponse<getUserByIdData[]>>{
        return $api.post<getUserByIdData[]>("/user/getAllRequestsToUser",id)
    }
    static async getAllFriendsToUser(id:{id:number}):Promise<AxiosResponse<getUserByIdData[]>>{
        return $api.post<getUserByIdData[]>("/user/getAllFriendsToUser",id)
    }
    static async deleteRequestToUser(request: requestToAddFriend):Promise<void>{
        $api.post("/user/deleteRequestToUser",request)
    }
    static async acceptRequestToUser(request: requestToAddFriend):Promise<AxiosResponse<responseToAddFriend>>{
        return $api.post<responseToAddFriend>("/user/acceptRequestToUser",request)
    }
}