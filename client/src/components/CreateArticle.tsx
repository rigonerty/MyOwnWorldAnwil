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




export const CreateArticle = () => {
  const [isCurrent, setCurrent] = useState("main")
  const [isToggleFocus, setToggleFocus] = useState<any>([null,null])
  const [isMainName, setMainName] = useState("")
  const [isHTMLPack, setHTMLPack] = useState<any>([])
  const [isJSONPack,setJSONPack] = useState<[string,any,any][]|[]>([])
  const [isCountOfEditors,setCountOfEditors] = useState(1)
  const id = appUseSelector(state=> state.user.id)
  const dispatch = appUseDispatch()
  const submit = ()=>{
    if(isJSONPack.length){
      const data:createArticle = {
        id,
        name: isMainName,
        article:[]
      }
      for(const json of isJSONPack){
        data.article.push({name:json[0],main:json[1],sidebar:json[2]})
      }
      dispatch(CreateArticleUser(data))      
    }

    
  }
  const updateHTML = (data:updateHTML)=>{
    const HTMLPack = isHTMLPack.map((a:any)=>a)
    HTMLPack[data.index] = [data.main,data.sidebar]
    const JSONPack = isJSONPack.map((a:any)=>a)
    JSONPack[data.index] = [data.name, data.jsonMain,data.jsonSidebar]
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
  return (
    <>
      <div className='CreateArticle'>
        <h1 className='CreateArticleHeader'>Создание статьи</h1>
        <div className='ToolsCreateHeader'>
            <Button onClick={()=>setCurrent("main")}>Главная</Button>
            <Button onClick={()=>setCurrent("add")}>Дополнительно</Button>
            <Button onClick={()=>setCurrent("galery")}>Галерея</Button>
            <Button onClick={()=>setCurrent("access")}>Доступ</Button>
            <Button onClick={()=>setCurrent("links")}>Ссылки</Button>
            <Button onClick={()=>setCurrent("secrets")}>Секреты</Button>
            <Button onClick={()=>setCurrent("design")}>Дизайн</Button>
            <Button onClick={()=>setCurrent("preview")}>Предосмотр</Button>
        </div>
        <div className={isCurrent==="main"?"ToolsCreateVisible":"ToolsCreateHidden"}>
          <Input value={isMainName} setValue={setMainName} placeholder='Введите название статьи' name='Название Статьи'/>
          <div>
            {articles}
          </div>
          <Button onClick={()=>setCountOfEditors(isCountOfEditors+1)}>+</Button>      
        </div>  

        <div className={isCurrent==="preview"?"CreatePreview ToolsCreateVisible":"CreatePreview ToolsCreateHidden"} >
          {
             isHTMLPack.map((arr:any)=>{
              return (
                <div>
                  <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(arr[0])}} className='Preview'>
                  </div>          
                  <div className='PreviewSidebar Preview' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(arr[1])}}>
                  </div> 
                </div>
              )
            })
          }
        </div>
        <Button onClick={submit}>Создать</Button>
      </div>    
    <AdditionalToolbarForText isToggleFocus={isToggleFocus}/>
  </>
  )
}
