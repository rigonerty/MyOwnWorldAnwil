import React, { useState,useEffect } from 'react'
import { Select } from './UI/Select/Select'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { getArticles } from '../store/articles'
interface props{
    setValue:(smth:string)=>void
}
export const MapToolsBarSelectArticle = ({setValue}:props) => {
    const id = appUseSelector(state=> state.user.id)
    const articles = appUseSelector(state=> state.articles.find(a=>a.id===id))
    const dispatch = appUseDispatch()
    const onChange = (e:string)=>{
        if(e!=="none"){
            setValue(`/user/${id}/article/${e}`)
        }else{
            setValue(e)
        }
    }
    useEffect( () => { if ( !articles ) dispatch(getArticles({id : id || 0})) },[ ] )
  return (
    <>                
        <p>Статья</p>        
        <Select style={{margin:"1em 0",width:"100%"}} onChange={(e)=>onChange(e.target.value)}>
            <option value="none">None</option>
            {articles?.articles.map(a=>{
                return <option value={a.id}>{a.name}</option>
            })}
        </Select>
    </>
  )
}
