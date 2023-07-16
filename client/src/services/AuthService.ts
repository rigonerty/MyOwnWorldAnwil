import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
import $api from "../http";



export default class AuthService{
    static async login(username:string,email:string,password:string):Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/login", {username,email,password})
    }
    static async register(username:string,email:string,password:string):Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/register", {username,email,password})
    }
    static async logout():Promise<void>{
        $api.post<AuthResponse>("/logout")
    }
    static async getImage(id:number):Promise<AxiosResponse<string>>{
        return $api.get<string>(`/image?id=${id}`)
    }
}