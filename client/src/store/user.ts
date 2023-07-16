import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/AuthService';
import axios from 'axios';
import { update } from '../models/User';
import UserService from '../services/UserService';

interface User{
    isAuth: boolean;
    username?:string;
    email?:string;
    id?:number|null;
    img?:string
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
            })
            .addCase(register.fulfilled, (state,action)=>{
                state.isAuth = true
                state.email = action.payload.data.user.email
                state.id = action.payload.data.user.id
                state.username = action.payload.data.user.username
            })
            .addCase(logout.fulfilled, (state,action)=>{
                state.isAuth = false
                state.email = ""
                state.id = null
                state.username = ""
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
export default userSlice.reducer