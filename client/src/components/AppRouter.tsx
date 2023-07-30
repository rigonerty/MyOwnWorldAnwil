import React from 'react'
import { appUseSelector } from '../hooks/reduxHooks'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes/routes';
export const AppRouter = () => {
    const isAuth = appUseSelector(state=> state.user.isAuth)
  return (
    isAuth
        ?
            <>
                <Routes>
                    {privateRoutes.map(rout=>{
                        return <Route path={rout.path} element={rout.element}/>
                    })}
                    <Route path='*' element={<Navigate to="/tools" replace/>}/>
                </Routes>
            </>
        :
            <>
                <Routes>
                    {publicRoutes.map(rout=>{
                        return <Route path={rout.path} element={rout.element}/>
                    })}
                    <Route path='*' element={<Navigate to="/" replace/>}/>
                </Routes>
            </>

  )
}
