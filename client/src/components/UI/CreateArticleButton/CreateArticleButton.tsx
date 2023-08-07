import React from 'react'
import { appUseDispatch, appUseSelector } from '../../../hooks/reduxHooks'
import { Button } from '../Button/Button'
import { CreateArticleUser } from '../../../store/user'
import { createArticle } from '../../../models/User'

interface props{
    JSONPack: {name:string;main:any;sidebar:any}[],
    name:string,
    role: string[],
    secrets: {roles:string[];name:string;main:any;sidebar:any}[]
}

export const CreateArticleButton = ({JSONPack, name,role,secrets}:props) => {
    const id = appUseSelector(state=> state.user.id)
    const dispatch = appUseDispatch()
    const submit = ()=>{
    if(JSONPack.length){
      const data:createArticle = {
        id,
        name: name,
        article:JSONPack,
        roles:role,
        secrets:secrets
      }
      dispatch(CreateArticleUser(data))      
    } 
  }
  return (
    <Button onClick={submit}>Создать</Button>
  )
}
