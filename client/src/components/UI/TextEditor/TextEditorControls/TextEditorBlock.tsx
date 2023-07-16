
import React from 'react'
import { TextEditorItem } from './TextEditorItem/TextEditorItem'
interface props{
    editorState: any,
    onBlockTonggle: (inlineStyles: string)=> void,
    BlockTypes: {label:string, style:string}[]
}
export const TextEditorBlock = ({editorState,onBlockTonggle,BlockTypes}:props) => {
    // const selection = editorState.getSelection()
    // const blockType = editorState
    //     .getCurrentContext()
    //     .getBlockForKey(selection.getStartKey())
    //     .getType()
  return (
    <div>
        {BlockTypes.map(style=>{
            return <TextEditorItem 
                key={style.label}
                onTonggle={onBlockTonggle}
                isActive={false}
                style={style.style}>
                {style.label}
            </TextEditorItem>
        })}
    </div>
  )
}