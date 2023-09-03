import React, { useState } from 'react'
import { appUseDispatch, appUseSelector } from '../../../hooks/reduxHooks'
import { Button } from '../Button/Button'
import { CreateArticleUser } from '../../../store/user'
import { createArticle } from '../../../models/User'
import { UpdateArticle } from '../../../store/articles'
import { updateArticle } from '../../../models/Tools'

interface props{
    JSONPack: {name:string;main:any;sidebar:any}[],
    name:string,
    role: string[],
    secrets: {roles:string[];name:string;main:any;sidebar:any}[];
    update?:boolean;
    idArticle?:number
}

export const CreateArticleButton = ({JSONPack, name,role,secrets,update,idArticle}:props) => {
    const id = appUseSelector(state=> state.user.id)
    const [isSended, setSended] = useState(false)
    const dispatch = appUseDispatch()
    const submit = ()=>{
    if(JSONPack.length&&id){
      const data:createArticle = {
        id,
        name: name,
        article:JSONPack,
        roles:role,
        secrets:secrets
      }
      const updateData:updateArticle={
        id,
        name: name,
        article:JSONPack,
        roles:role,
        secrets:secrets,
        idArticle:idArticle?idArticle:0
      }
      console.log(updateData)
      if(!update)dispatch(CreateArticleUser(data))      
      if(update&&idArticle) dispatch(UpdateArticle(updateData))
      setSended(true)
    }
  }
  return (
    <Button onClick={submit} disabled={isSended} style={isSended?{background:"#101010", color:"#f1f1f1",border:"1px solid white"}:{}}>{update?"Обновить":"Создать"}</Button>
  )
}
