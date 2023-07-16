
import React from 'react'
import { TextEditorItem } from './TextEditorItem/TextEditorItem'
interface props{
    editorState: any,
    onInlineTonggle: (inlineStyles: string)=> void,
    inlineStyles: {label:string, style:string}[],
}
export const TextEditorInline = ({editorState,onInlineTonggle,inlineStyles}:props) => {
    const currentStyle = editorState.getCurrentInlineStyle()
  return (
    <div>
        {inlineStyles.map(style=>{
            return <TextEditorItem 
                key={style.label}
                onTonggle={onInlineTonggle}
                isActive={currentStyle.has(style.style)}
                style={style.style}>
                {style.label}
            </TextEditorItem>
        })}
    </div>
  )
}