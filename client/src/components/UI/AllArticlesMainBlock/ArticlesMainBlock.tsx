import { useEffect, useState } from 'react'
import { TextEditor } from '../TextEditor/TextEditor'
import { EditorState} from 'draft-js'
import { options } from '../TextEditor/BlockRenderFunction'
import { stateToHTML } from 'draft-js-export-html'
import { Input } from '../Input/Input'
import { convertToRaw } from 'draft-js'
interface props{
  index: number,
  updateHTML:({index,main,sidebar}:updateHTML)=> void,
  setToggleFocus: ([editorState, setEditorState]: any) => void
}
export interface updateHTML{
  index:number,
  main:string,
  sidebar:string,
  jsonMain: any,
  jsonSidebar: any,
  name:string
}
export const ArticlesMainBlock = ({index,updateHTML,setToggleFocus}:props) => {
  const [isBlockName, setBlockName] = useState("")
  const [isMain, setMain] = useState(EditorState.createEmpty())
  const [isSideBar, setSideBar] = useState(EditorState.createEmpty())
  useEffect(()=>{
      const isMainContent = isMain.getCurrentContent() 
      const stateMain = stateToHTML(isMainContent,options)
      const isSideBarContent = isSideBar.getCurrentContent() 
      const stateSidebar = stateToHTML(isSideBarContent,options)
      const data = {
        index,
        main:stateMain,
        sidebar:stateSidebar,
        jsonMain: convertToRaw(isMainContent),
        jsonSidebar: convertToRaw(isSideBarContent),
        name:isBlockName
      }
    updateHTML(data)
  },[isMain, isSideBar,isBlockName] )

  return (
    <>
      <Input name='Название Блока' value={isBlockName} setValue={setBlockName} placeholder='Введите название блока'/>
      <h2>Основная часть</h2>
      <TextEditor editorState={isMain} setEditorState={setMain} setToggleFocus={setToggleFocus}/>         
      <h2>Сайдбар</h2>
      <TextEditor editorState={isSideBar} setEditorState={setSideBar} setToggleFocus={setToggleFocus}/>
      <hr/>
    </>
 )
}
