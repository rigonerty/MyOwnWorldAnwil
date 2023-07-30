import React, { useState } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import cl from "./AdditionalToolbarForText.module.css"
import { EditorState } from 'react-draft-wysiwyg'
import { onToggleBlockType } from '../TextEditor/TextEditor'
import { FloatingList } from '../FloatingList/FloatingList'
import { addHandler } from '../TextEditor/BlockRenderFunction'
import { FloatComponents } from './Components/FloatComponents'
import { TableComponent } from './Components/TableComponent'
interface props{
  isToggleFocus: [null,null]|[any,any]
}

export const AdditionalToolbarForText = ({isToggleFocus}:props) => {
  return (
    <div className={cl.AddToolBar}>
        <div className={cl.AddToolBarContainer}>
          <FloatingList name='Float Компоненты'>
            <FloatComponents isToggleFocus={isToggleFocus}/>          
          </FloatingList>
          <FloatingList name='Таблицы'>
            <TableComponent isToggleFocus={isToggleFocus}/>          
          </FloatingList>
        </div>
        
    </div>
  )
}
