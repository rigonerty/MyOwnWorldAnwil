import React,{useEffect, useState} from 'react'
import { TextEditor } from './UI/TextEditor/TextEditor'
import { Input } from './UI/Input/Input'
import { EditorState, convertToRaw } from 'draft-js'
import { Button } from './UI/Button/Button'
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify'
import { convertFromHTML } from 'draft-js'
import { AdditionalToolbarForText } from './UI/AdditionalToolbarForText/AdditionalToolbarForText'
import { stateToHTML } from 'draft-js-export-html'
import { options } from './UI/TextEditor/BlockRenderFunction'
import { ArticlesMainBlock, updateHTML } from './UI/AllArticlesMainBlock/ArticlesMainBlock'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { createArticle } from '../models/User'
import { CreateArticleUser } from '../store/user'
import { CreateArticleButton } from './UI/CreateArticleButton/CreateArticleButton'
import { CreateArticlePreview } from './CreateArticlePreview'
import { CreateArticleSecrets } from './CreateArticleSecrets'
import { Select } from './UI/Select/Select'



export const CreateArticle = () => {
  const [isCurrent, setCurrent] = useState("main")
  const [isToggleFocus, setToggleFocus] = useState<any>([null,null])
  const [isMainName, setMainName] = useState("")
  const [isHTMLPack, setHTMLPack] = useState<{name:string;main:string;sidebar:string}[]>([])
  const [isJSONPack,setJSONPack] = useState<{name:string;main:any;sidebar:any}[]>([])
  const [isJSONSecrets, setJSONSecrets] = useState<{roles:string[];name:string;main:any;sidebar:any}[]>([])
  const [isHTMLSecrets, setHTMLSecrets] = useState<{name:string;main:any;sidebar:any}[]>([])
  const [isCountOfEditors,setCountOfEditors] = useState(1)
  const [isAccess , setAccess]= useState<string[]>([])
  const roles = appUseSelector(state=> state.user.roles)
  const id = appUseSelector(state=>state.user.id)
  const updateHTML = (data:updateHTML)=>{
    const HTMLPack = isHTMLPack.map((a:any)=>a)
    HTMLPack[data.index] = {name:data.name, main:data.main,sidebar:data.sidebar}
    const JSONPack = isJSONPack.map((a:any)=>a)
    JSONPack[data.index] = {name:data.name, main:data.jsonMain,sidebar:data.jsonSidebar}
    setHTMLPack(HTMLPack)
    setJSONPack(JSONPack)
  }
  const AllArticleBlocks = ()=>{
    const arr = []
    for(let i=0; i <isCountOfEditors; i++){
      arr.push(<ArticlesMainBlock index={i} setToggleFocus={setToggleFocus} updateHTML={updateHTML} key={i}/>)
    }
    return arr
  }
  const articles = AllArticleBlocks()
  const updateSecrets = (data:updateHTML)=>{
    if(data.roles){
      const newHTMLSecrets = isHTMLSecrets.map(a=>a)
      newHTMLSecrets[data.index] = {name:data.name,main:data.main,sidebar:data.sidebar}
      setHTMLSecrets(newHTMLSecrets)

      const newJSONSecrets = isJSONSecrets.map(a=>a)
      const roles = data.roles.map(a=>a+" "+ id)
      newJSONSecrets[data.index] = {roles, name:data.name,main:data.jsonMain,sidebar:data.jsonSidebar}      
      setJSONSecrets(newJSONSecrets)
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
      if(roles) setAccess(roles[0])
  },[])
  return (
    <>
      <div className='CreateArticle'>
        <h1 className='CreateArticleHeader'>Создание статьи</h1>
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
              return <option value={a}>{a}</option>
            })}
          </Select>
          <div>
            {articles}
          </div>
          <Button onClick={()=>setCountOfEditors(isCountOfEditors+1)}>+</Button>      
        </div>   
      <CreateArticleSecrets isCurrent={isCurrent} setToggleFocus={setToggleFocus} updateHTML={updateSecrets}/>
      <CreateArticlePreview HTMLPack={isHTMLPack} isCurrent={isCurrent} SecretsHTMLPack={isHTMLSecrets}/>
      <CreateArticleButton name={isMainName} JSONPack={isJSONPack} role={isAccess} secrets={isJSONSecrets}/>
      </div>    
    <AdditionalToolbarForText isToggleFocus={isToggleFocus}/>
  </>
  )
}
