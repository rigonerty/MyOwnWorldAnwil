import React,{useEffect, useState} from 'react'
import { Input } from './UI/Input/Input'
import { Button } from './UI/Button/Button'
import { AdditionalToolbarForText } from './UI/AdditionalToolbarForText/AdditionalToolbarForText'
import { ArticlesMainBlock, updateHTML } from './UI/AllArticlesMainBlock/ArticlesMainBlock'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { CreateArticleButton } from './UI/CreateArticleButton/CreateArticleButton'
import { CreateArticlePreview } from './CreateArticlePreview'
import { CreateArticleSecrets } from './CreateArticleSecrets'
import { Select } from './UI/Select/Select'
import { useParams } from 'react-router-dom'
import { getArticle } from '../store/articles'

export const UpdateArticles = () => {
  const {articleId} = useParams()
  const id = appUseSelector(state=>state.user.id)
  const article = appUseSelector(state=>{
        const neededArticles = state.articles.find(a=>a.id === id)
        return neededArticles?.articles.find(a=>a.id+"" === articleId)
    })
  const dispatch = appUseDispatch() 
  const [isCountOfEditors,setCountOfEditors] = useState(article?article.article.length:1)

  const [isCurrent, setCurrent] = useState("main")
  const [isToggleFocus, setToggleFocus] = useState<any>([null,null])
  const [isMainName, setMainName] = useState(article?article.name:"")
  const [isHTMLPack, setHTMLPack] = useState<{name:string;main:string;sidebar:string}[]>([])
  const [isJSONPack,setJSONPack] = useState<{name:string;main:any;sidebar:any}[]>([])
  const [isJSONSecrets, setJSONSecrets] = useState<{roles:string[];name:string;main:any;sidebar:any}[]>([])
  const [isHTMLSecrets, setHTMLSecrets] = useState<{name:string;main:any;sidebar:any}[]>([])
  
  const [isAccess , setAccess]= useState<string[]>([])
  const roles = appUseSelector(state=> state.user.roles)



  const updateHTML = (data:updateHTML)=>{
    setHTMLPack(arr=>{
        arr[data.index] = {name:data.name,main:data.main,sidebar:data.sidebar}
        return [...arr]
      })
    setJSONPack(arr=>{
        arr[data.index] = {name:data.name,main:data.jsonMain,sidebar:data.jsonSidebar}
        return [...arr]
      })
  }
  const AllArticleBlocks = ()=>{
    const arr = []
    for(let i=0; i <isCountOfEditors; i++){
      arr.push(<ArticlesMainBlock index={i} setToggleFocus={setToggleFocus} updateHTML={updateHTML} key={i} value={article?.article[i]}/>)
    }
    return arr
  }
  const articles = AllArticleBlocks()
  const updateSecrets = (data:updateHTML)=>{
    if(data.roles){
      setHTMLSecrets(arr=>{
        arr[data.index] = {name:data.name,main:data.main,sidebar:data.sidebar}
        return [...arr]
      })
      const roles = data.roles.map(a=>a+" "+ id)  
      setJSONSecrets(arr=>{
        arr[data.index] = {roles,name:data.name,main:data.jsonMain,sidebar:data.jsonSidebar}
        return [...arr]
      })
    }
  }
  const Secrets=(e:string)=>{
    if(roles){
      const newRoles = [] 
      let access = false
      for(const role of roles[0]){
        if(role ===e){
          access=true
        }  
        if(access) {
          newRoles.push(role)
        } 
      }      
      setAccess(newRoles)
    }
  }
  useEffect(()=>{
        if(article?.roles){
          const roles = []
          for(const Role of article.roles){
            roles.push(Role.split(" ")[0])
          }
        setAccess(roles)
      }
      else if(roles) setAccess(roles[0])
      if(id && articleId && !article) dispatch(getArticle({idUser:+id,idArticle:+articleId}))
  },[])
  return (
    <>
      <div className='CreateArticle'>
        <h1 className='CreateArticleHeader'>Редактирование статьи</h1>
        <div className='ToolsCreateHeader'>
            <Button onClick={()=>setCurrent("main")}>Главная</Button>
            <Button onClick={()=>setCurrent("add")}>Дополнительно</Button>
            <Button onClick={()=>setCurrent("galery")}>Галерея</Button>
            <Button onClick={()=>setCurrent("links")}>Ссылки</Button>
            <Button onClick={()=>setCurrent("secrets")}>Секреты</Button>
            <Button onClick={()=>setCurrent("design")}>Дизайн</Button>
            <Button onClick={()=>setCurrent("preview")}>Предосмотр</Button>
        </div>
        <div className={isCurrent==="main"?"ToolsCreateVisible":"ToolsCreateHidden"}>
          <Input value={isMainName} setValue={setMainName} placeholder='Введите название статьи' name='Название Статьи' max={40}/>
          <Select onChange={(e)=>{Secrets(e.target.value)}}>
            {roles&&roles[0].map((a)=>{
              if(a===article?.roles[0].split(" ")[0]){
                return <option value={a} selected>{a}</option>
              } 
              return <option value={a}>{a}</option>
            })}
          </Select>
          <div>
            {articles}
          </div>
          <Button onClick={()=>setCountOfEditors(isCountOfEditors+1)}>+</Button>      
        </div>   
      <CreateArticleSecrets isCurrent={isCurrent} setToggleFocus={setToggleFocus} updateHTML={updateSecrets} value={article?.secrets}/>
      <CreateArticlePreview HTMLPack={isHTMLPack} isCurrent={isCurrent} SecretsHTMLPack={isHTMLSecrets}/>
      <CreateArticleButton name={isMainName} JSONPack={isJSONPack} role={isAccess} secrets={isJSONSecrets} update={true} idArticle={article?.id}/>
      </div>    
    <AdditionalToolbarForText isToggleFocus={isToggleFocus}/>
  </>
  )
}
