import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user'
import usersSlice  from './users'
import articlesSlice from './articles'
import mapsSlice  from './maps'
const store = configureStore({
    reducer:{
        user: userSlice,
        users: usersSlice,
        articles:articlesSlice,
        maps:mapsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store