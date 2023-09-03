import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/AuthService';
import axios from 'axios';
import { createArticle, requestToAddFriend, responseToAddFriend, update } from '../models/User';
import UserService from '../services/UserService';
import { getUserByIdData } from './users';
import ToolsService from '../services/ToolsService';
import { getArticlesById, updateArticle } from '../models/Tools';




const initialState:getArticlesById[] = []


export const articlesSlice = createSlice({
    name:"articles",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(getArticle.fulfilled, (state,action)=>{
                const neededUser = state.find(a=>a.id===action.payload.data.id)
                if(neededUser){
                    const neededArticle = neededUser.articles.find(a=>a.id===action.payload.data.article.id)
                    if(!neededArticle){
                        neededUser.articles.push(action.payload.data.article)
                    }else{

                    }
                    
                }else{
                    state.push({id:action.payload.data.id, articles:[action.payload.data.article]})
                }

            })
            .addCase(getArticles.fulfilled, (state,action)=>{
                const neededUser = state.find(a=>a.id===action.payload.data.id)
                if(neededUser){
                    for(const gettedArticles of action.payload.data.articles){
                        let exist = false
                        for(const existsArticles of neededUser.articles){
                            if(existsArticles.id === gettedArticles.id){
                                exist = true
                            }
                        }     
                        if(!exist){
                            neededUser.articles.push(gettedArticles)
                        }                   
                    }   
                }else{
                    state.push({id:action.payload.data.id, articles:[...action.payload.data.articles]})
                }
            })
            .addCase(UpdateArticle.fulfilled, (state, action)=>{
                const data = action.payload.data
                const neededUser = state.find(a=>a.id === data.id)
                if(neededUser){
                    const neededArticle = neededUser.articles.find(a=>a.id===data.idArticle)
                    if(neededArticle){
                        neededArticle.name = data.name
                        neededArticle.article = data.article
                        neededArticle.secrets = data.secrets
                        neededArticle.roles = data.roles
                    }else{
                        neededUser.articles.push({id:data.idArticle,name:data.name,article:data.article,roles:data.roles,secrets:data.secrets})
                    }
                    
                }else{
                    state.push({id:data.id, articles:[{id:data.idArticle,name:data.name,article:data.article,roles:data.roles,secrets:data.secrets}]})
                }
            })
    },
})

export const getArticle = createAsyncThunk("articles/getArticle", async (data:{idUser:number,idArticle:number})=>{
    const resData = await ToolsService.getArticle(data)
    return {data:resData.data}
})
export const UpdateArticle = createAsyncThunk("articles/updateArticle", async (data:updateArticle)=>{
    const resData = await ToolsService.updateArticle(data)
    return {data:resData.data}
})
export const getArticles = createAsyncThunk("articles/getArticles", async (id:{id:number})=>{
    const resData = await ToolsService.getAllArticles(id)
    return {data:resData.data}
})

export default articlesSlice.reducer