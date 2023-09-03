import React,{useState} from 'react'
import { TextEditor } from './UI/TextEditor/TextEditor'
import { Input } from './UI/Input/Input'
import { EditorState, convertToRaw } from 'draft-js'
import { Button } from './UI/Button/Button'
export const CreateArticleEdit = () => {
  const [isMainName, setMainName] = useState("")
  const [isMain, setMain] = useState(EditorState.createEmpty())
  const [isSideBar, setSideBar] = useState(EditorState.createEmpty())

  const submit = ()=>{
    const isMainContent = isMain.getCurrentContent() 
    const isMainConvert = convertToRaw(isMainContent)
    console.log(isMainConvert)
  }
  return (
    <>
      {/* <Input value={isMainName} setValue={setMainName} placeholder='Введите название статьи' name='Название Статьи'/>
      <h2>Основная часть</h2>
      <TextEditor editorState={isMain} setEditorState={setMain}/>
      <h2>Sidebar</h2>
      <TextEditor editorState={isSideBar} setEditorState={setSideBar}/>
      <Button onClick={submit}>Создать</Button> */}
    </>
  )
}