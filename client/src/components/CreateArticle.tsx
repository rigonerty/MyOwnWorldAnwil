import React,{useEffect, useState} from 'react'
import { TextEditor } from './UI/TextEditor/TextEditor'
import { Input } from './UI/Input/Input'
import { EditorState, convertToRaw } from 'draft-js'
import { Button } from './UI/Button/Button'
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify'
import { convertFromHTML } from 'draft-js'
import { AdditionalToolbarForText } from './UI/AdditionalToolbarForText/AdditionalToolbarForText'




export const CreateArticle = () => {
  const [isMainName, setMainName] = useState("")
  const [isMain, setMain] = useState(EditorState.createEmpty())
  const [isSideBar, setSideBar] = useState(EditorState.createEmpty())
  const [isHTMLMain, setHTMLMain] = useState("")
  const [isHTMLSideBar, setHTMLSideBar] = useState("")
  useEffect(()=>{
      const isMainContent = isMain.getCurrentContent() 
      const isMainConvert = convertToRaw(isMainContent)
      const isSideBarContent = isSideBar.getCurrentContent() 
      const isSidebarConvert = convertToRaw(isSideBarContent)
      const makeupMain = draftToHtml(isMainConvert)
      const makeupSidebar = draftToHtml(isSidebarConvert,{
          trigger: '#',
          separator: ' ',
        },true)
      setHTMLMain(makeupMain)
      setHTMLSideBar(makeupSidebar)
  },[isMain,isSideBar] )
  const submit = ()=>{

  }
  const [isCurrent, setCurrent] = useState("main")
  const [isToggleFocus, setToggleFocus] = useState<any>([null,null])
  return (
    <>
      <div>
        <h1 className='CreateArticleHeader'>Создание статьи</h1>
        <div className='ToolsCreateHeader'>
            <Button onClick={()=>setCurrent("main")}>Главная</Button>
            <Button onClick={()=>setCurrent("add")}>Дополнительно</Button>
            <Button onClick={()=>setCurrent("galery")}>Галерея</Button>
            <Button onClick={()=>setCurrent("access")}>Доступ</Button>
            <Button onClick={()=>setCurrent("links")}>Ссылки</Button>
            <Button onClick={()=>setCurrent("secrets")}>Секреты</Button>
            <Button onClick={()=>setCurrent("design")}>Дизайн</Button>
            <Button onClick={()=>setCurrent("previev")}>Предосмотр</Button>
        </div>
        {isCurrent==="main" &&
          <div>
            <Input value={isMainName} setValue={setMainName} placeholder='Введите название статьи' name='Название Статьи'/>
            <h2>Основная часть</h2>
            <TextEditor editorState={isMain} setEditorState={setMain} setToggleFocus={setToggleFocus}/>         
            <h2>Сайдбар</h2>
            <TextEditor editorState={isSideBar} setEditorState={setSideBar} setToggleFocus={setToggleFocus}/>        
          </div>  
        }
        {
          isCurrent === "previev" && 
          <div className='CreatePreview'>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(isHTMLMain)}} className='Preview'>
              
            </div>          
            <div className='PreviewSidebar Preview' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(isHTMLSideBar)}}>

            </div>
          </div>

        }
        <Button onClick={submit}>Создать</Button>
      </div>    
    <AdditionalToolbarForText isToggleFocus={isToggleFocus}/>
  </>
  )
}
