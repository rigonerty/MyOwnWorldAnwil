import { getUserByIdData } from "../store/users";

export interface User{
    isAuth: boolean;
    username:string;
    email:string;
    id:number;
    img:string;
    friends: getUserByIdData[]
    requests:getUserByIdData[],
    roles:[string[],string[]]
}
export interface update{
    username: string;
    email: string;
    password: string|null;
    newPassword: string|null;
    img: string|null ;
    id:number
}
export interface createArticle{
    id:number|undefined|null;
    name:string;
    article:{name:string;main:any;sidebar:any}[];
    roles: string[];
    secrets: {roles:string[];name:string;main:any;sidebar:any}[]
}
export interface responseToAddFriend {
    sender: number,
    requestTo:number
    accept: boolean
}
export interface requestToAddFriend {
    id: number,
    idTo:number
}