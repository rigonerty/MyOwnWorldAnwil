import { EditorState } from 'draft-js'
import React from 'react'
import { TextEditorItem } from './TextEditorItem/TextEditorItem'
interface props{
    editorState: any,
    onInlineTonggle: (inlineStyles: string)=> void,
    inlineStyles: {label:string, style:string}[],
    onBlockTonggle: (inlineStyles: string)=> void,
    BlockTypes: {label:string, style:string}[]
}
export const TextEditorControls = ({editorState,onInlineTonggle,inlineStyles}:props) => {
    const currentStyle = editorState.getCurrentInlineStyle()
  return (
    <div>
        {inlineStyles.map(style=>{
            return <TextEditorItem 
                onTonggle={onInlineTonggle}
                isActive={currentStyle.has(style.style)}
                style={style.style}>
                {style.label}
            </TextEditorItem>
        })}
    </div>
  )
}
