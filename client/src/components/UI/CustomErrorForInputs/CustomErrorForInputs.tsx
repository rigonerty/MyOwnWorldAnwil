import React from 'react'
import cl from "./CustomErrorForInputs.module.css"
interface props{
    text: string;
    condition: Function;
}
export const CustomErrorForInputs = ({text,condition}:props) => {
    const valid = condition()
  return (
    <p className={cl.CustomErrorForInputs}>{valid?"":text}</p>
  )
}
