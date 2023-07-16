import {useRef,useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import cl from "./TextEditor.module.css"
import { Button } from '../Button/Button';
import { RichUtils } from 'draft-js';
import { InlineBlock } from './InlineBlock';
import { blockRendererFn, extendedBlockRenderMap } from './BlockRenderFunction';
import { DraftBlockType } from 'draft-js';




interface props{
  editorState: any /*EditorState*/;
  setEditorState: (something:any)=>void;
  setToggleFocus: ([editorState, setEditorState]:any)=>void
}

export const onToggleBlockType = (blockType: any,  onChange:Function, editorState:any)=> {
  onChange(RichUtils.toggleBlockType(editorState,blockType))
}

export const TextEditor = ({editorState,setEditorState, setToggleFocus}:props) => {
  const [isUploadedImages,setUpladedImages] = useState<any>([]);



  function _uploadImageCallBack(file:any){
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }
    setUpladedImages((imgs:any)=> imgs.push(imageObject));
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imageObject.localSrc } });
      }
    );
  }
  return (
    <div className={cl.TextEditor}>
      <div className={cl.TextEditorContainer}>
          <Editor
            toolbar={{image:{
              uploadCallback: _uploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',}}}
            toolbarClassName={cl.TextEditorTools} 
            editorClassName= {cl.TextEditorMain}
            editorState={editorState} 
            placeholder="Введите ваш текст" 
            onEditorStateChange={(editorState:any)=> {setEditorState(editorState);setToggleFocus([editorState,setEditorState])}}
            // blockRendererFn={blockRendererFn}
            blockRenderMap={extendedBlockRenderMap}
            />
      </div>

    </div>
  )
}