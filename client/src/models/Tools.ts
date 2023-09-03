export interface roles{
    role: [string[],string[]]
}
export interface Article{
    name:string;
    id:number;
    article:{name:string;main:any;sidebar:any}[];
    secrets:{roles:string[];name:string;main:any;sidebar:any}[];
    roles:string[]
}
export interface getArticleById{
    id:number;
    article:Article;
}
export interface getArticlesById{
    id:number;
    articles:Article[];
}
export interface updateArticle{
    name:string;
    id:number;
    article:{name:string;main:any;sidebar:any}[];
    secrets:{roles:string[];name:string;main:any;sidebar:any}[];
    roles:string[];
    idArticle:number
}