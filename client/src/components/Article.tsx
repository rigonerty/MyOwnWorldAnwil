import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { getArticle } from '../store/articles'
import { ArticleItem } from './ArticleItem'

export const Article = () => {
    const {userId,articleId} = useParams()
    const user = appUseSelector(state=>state.user)
    const article = appUseSelector(state=>{
        const neededArticles = state.articles.find(a=>a.id+"" === userId)
        return neededArticles?.articles.find(a=>a.id+"" === articleId)
    })
    const dispatch = appUseDispatch()
    useEffect(()=>{
        if(userId && articleId && !article) dispatch(getArticle({idUser:+userId,idArticle:+articleId}))
    },[])  
  return (
    <div>
        {article && user.roles
            ?<ArticleItem article={article} userRoles={user.id==userId?user.roles[0]:user.roles[1]} creatorId={userId?+userId:0}/>
            :<h1>Поста не существует</h1>
        }
    </div>
  )
}
