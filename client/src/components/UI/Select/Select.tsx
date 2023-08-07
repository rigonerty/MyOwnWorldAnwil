import React from 'react'
import cl from "./Select.module.css"
interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, React.AriaAttributes  {}
export const Select = ({children,...props}:SelectProps) => {
  return (
    <select className={cl.Select} {...props}>
        {children}
    </select>
  )
}
