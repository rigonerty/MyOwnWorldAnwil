import React from 'react'
import { Link } from 'react-router-dom'
import cl from "./ButtonToCreate.module.css"
interface props{
    children: React.ReactNode,
    to: string
}
export const ButtonToCreate = ({children, to}:props ) => {
  return (
    <Link to={to} className={cl.buttonToCreate}>{children}</Link>
  )
}
