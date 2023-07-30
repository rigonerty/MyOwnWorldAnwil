import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/AuthService';
import axios from 'axios';
import { createArticle, requestToAddFriend, responseToAddFriend, update } from '../models/User';
import UserService from '../services/UserService';
import { getUserByIdData } from './users';




interface User{
    isAuth: boolean;
    username?:string;
    email?:string;
    id?:number|null;
    img?:string;
    friends?: getUserByIdData[]
    requests?:getUserByIdData[]
}
interface logAndReg{
    username:string;
    email:string;
    password: string
}
const initialState:User = {
    isAuth: false
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state,action)=>{
                state.isAuth = true
                state.email = action.payload.data.user.email
                state.id = action.payload.data.user.id
                state.username = action.payload.data.user.username
                state.friends = []
                state.requests = []
            })
            .addCase(register.fulfilled, (state,action)=>{
                state.isAuth = true
                state.email = action.payload.data.user.email
                state.id = action.payload.data.user.id
                state.username = action.payload.data.user.username
                state.friends = []
                state.requests = []
            })
            .addCase(logout.fulfilled, (state,action)=>{
                state.isAuth = false
                state.email = ""
                state.id = null
                state.username = ""
                state.img = ""
                state.friends = []
                state.requests = []
            })
            .addCase(checkAuth.fulfilled, (state,action)=>{
                if(action.payload){
                    state.isAuth = true
                    state.email = action.payload.data.user.email
                    state.id = action.payload.data.user.id
                    state.username = action.payload.data.user.username                    
                }else{
                    state.isAuth = false
                    state.email = ""
                    state.id = null
                    state.username = ""
                    state.friends = []
                    state.requests = []     
                }

            })
            .addCase(getImage.fulfilled, (state,action)=>{
                state.img = action.payload?.data
            })
            .addCase(updateData.fulfilled, (state,action)=>{
                state.username = action.payload?.data.username
                state.email = action.payload?.data.email
                if(action.payload?.data.img){
                    state.img = action.payload?.data.img
                }
                
            })
            .addCase(CreateArticleUser.fulfilled,(state,action)=>{
                console.log(action.payload?.data)
            })
            .addCase(getAllRequestsToUser.fulfilled, (state,action)=>{
                if(action.payload?.data.length){
                    const newRequests = []
                    for(const request of action.payload?.data){
                        const neededRequest = state.requests?.find(a=>a.id === request.id)
                        if(!neededRequest){
                            newRequests.push(request)
                        }
                    }
                    if(state.requests){
                        state.requests.push(...newRequests)
                    }else{
                        state.requests = []
                        state.requests.push(...newRequests)
                    }
                }

                
            })
            .addCase(getAllFriendsToUser.fulfilled, (state,action)=>{
                if(action.payload?.data.length){
                    const newFriends = []
                    for(const friends of action.payload?.data){
                        const neededFriends = state.friends?.find(a=>a.id === friends.id)
                        if(!neededFriends){
                            newFriends.push(friends)
                        }
                    }
                    if(state.friends){
                        state.friends.push(...newFriends)
                    }else{
                        state.friends = []
                        state.friends.push(...newFriends)
                    }
                }
                
            })
            .addCase(deleteRequestToUser.fulfilled, (state,action)=>{
                const data = action.payload
                if(state.requests ){
                    if(state.id === data?.id){
                        state.requests = state.requests.filter(a=> a.id !== data?.idTo)
                        state.friends = state.friends?.filter(a=> a.id !== data?.idTo)
                    }else{
                        state.requests = state.requests.filter(a=> a.id !== data?.id)
                        state.friends = state.friends?.filter(a=> a.id !== data?.id)
                    }
                    
                }
            })
            .addCase(acceptRequestToUser.fulfilled,(state,action)=>{
                const data = action.payload?.data
                if(state.requests){
                    let neededRequest;
                    if(state.id === data?.sender){
                        neededRequest = state.requests.filter(a=> a.id === data?.requestTo)
                        state.requests = state.requests.filter(a=> a.id !== data?.requestTo)                        
                    } else{
                        neededRequest = state.requests.filter(a=> a.id === data?.sender)
                        state.requests = state.requests.filter(a=> a.id !== data?.sender)                         
                    }
                    state.friends?.push(...neededRequest)

                }
            })
    },
})

export const login = createAsyncThunk("user/login" ,async (data:logAndReg)=>{
    const res = await AuthService.login(data.username,data.email,data.password)
    localStorage.setItem("token", res.data.accessToken)
    return {data:res.data}
})
export const register = createAsyncThunk("user/register" ,async (data:logAndReg)=>{
    const res = await AuthService.register(data.username,data.email,data.password)
    localStorage.setItem("token", res.data.accessToken)
    return {data:res.data}
})
export const logout = createAsyncThunk("user/logout" ,async ()=>{
    await AuthService.logout()
    localStorage.removeItem("token")
})
export const checkAuth = createAsyncThunk("user/refresh" ,async ()=>{
    try{
        const res = await axios.get("http://localhost:5000/refresh", {withCredentials:true})
        localStorage.setItem("token", res.data.accessToken)
        return {data:res.data}       
    }catch(e){
        console.log(e)
    }

})
export const getImage = createAsyncThunk("user/getImage" ,async (id:number)=>{
    try{
        const res = await AuthService.getImage(id)
        return {data:res.data}       
    }catch(e){
        console.log(e)
    }

})
export const updateData = createAsyncThunk("user/updateData", async(data:update)=>{
    try{
        const res = await UserService.update(data)
        return {data: res.data}
    }catch(e){
        console.log(e)
    }
})
export const CreateArticleUser = createAsyncThunk("user/createArticle", async(data:createArticle)=>{
    try{
        const res = await UserService.createArticle(data)
        return {data: res.data}
    }catch(e){
        console.log(e)
    }
})
export const sendRequestToUser = createAsyncThunk("user/sendRequestToUser", async(data:requestToAddFriend)=>{
    try{
        const res = await UserService.sendRequestToUser(data)
        return {data: res.data}
    }catch(e){
        console.log(e)
    }
})
export const  deleteRequestToUser = createAsyncThunk("user/deleteRequestToUser", async(data:requestToAddFriend)=>{
    try{
        await UserService.deleteRequestToUser(data)
        return data
    }catch(e){
        console.log(e)
    }
})
export const acceptRequestToUser = createAsyncThunk("user/acceptRequestToUser", async(data:requestToAddFriend)=>{
    try{
        const res = await UserService.acceptRequestToUser(data)
        return {data: res.data}
    }catch(e){
        console.log(e)
    }
})
export const getAllRequestsToUser = createAsyncThunk("user/getAllRequestsToUser", async(id:{id:number})=>{
    const res = await UserService.getAllRequestsToUser(id)
    return {data: res.data}
})
export const getAllFriendsToUser = createAsyncThunk("user/getAllFriendsToUser", async(id:{id:number})=>{
    const res = await UserService.getAllFriendsToUser(id)
    return {data: res.data}
})
export default userSlice.reducer