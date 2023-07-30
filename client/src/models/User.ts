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
    article:{name:string;main:any;sidebar:any}[]
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