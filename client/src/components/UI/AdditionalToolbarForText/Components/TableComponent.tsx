import React, { useState } from 'react'
import { Input } from '../../Input/Input'
import { Button } from '../../Button/Button'
import { addHandler } from '../../TextEditor/BlockRenderFunction'
import { createPortal } from 'react-dom'
interface props{
  isToggleFocus: [null,null]|[any,any]
}
export const TableComponent = ({isToggleFocus}:props) => {
  const [isColumns, setColumns] = useState(0)
  const [isRows, setRows] = useState(0)
  const [isFloat,setFloat] = useState(false)
  const [isId,setId] = useState(0)
  const [isPosition ,setPosition]= useState<any>([])
  const CreateTable = ()=>{

  }
  return (
    <div>
      <Input name='Количество колон' type='number' value={isColumns} setValue={setColumns} placeholder='Введите количество колонок в вашей таблице'/>
      <Input name='Количество рядов' type='number' value={isRows} setValue={setRows} placeholder='Введите количество рядов в вашей таблице'/>
      <Input name='Float' type='checkbox' value={isFloat} setValue={setFloat} placeholder=''/>
      <Button onClick={(e)=>{e.preventDefault(); CreateTable()}} style={{width:"100%"}}>Создать</Button>
    </div>
  )
}
