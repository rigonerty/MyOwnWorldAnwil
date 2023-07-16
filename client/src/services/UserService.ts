import { AxiosResponse } from "axios";
import { update } from "../models/User";
import $api from "../http";


export default class UserService{
    static async update(update:update):Promise<AxiosResponse<update>>{
        return $api.post<update>("/user/update", update)
    }
}