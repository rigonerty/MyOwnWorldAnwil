import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user'
import usersSlice  from './users'
const store = configureStore({
    reducer:{
        user: userSlice,
        users: usersSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store