import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import UserService from "../services/UserService"
interface User{
    username?:string;
    email?:string;
    id?:number|null;
    img?:string
}
export interface getUserByIdData{
    username:string;
    email:string;
    id:number|null; 
    img:string
}

const initialState:getUserByIdData[] = []

export const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(getUserById.fulfilled, (state,action)=>{
                if(action.payload.data.id){
                    const user = {
                        username: action.payload.data.username,
                        email: action.payload.data.email,
                        id: action.payload.data.id,
                        img: action.payload.data.img
                    }
                    const neededUser = state.find(a=> a.id === user.id)
                    if(!neededUser){
                    state.push(user) 
                    }                    
                }

            })
    },
})

export const getUserById = createAsyncThunk("users/getUserById", async (id:number)=>{

    const res = await UserService.getUserById({id})
    return {data:res.data}
})
export default usersSlice.reducer