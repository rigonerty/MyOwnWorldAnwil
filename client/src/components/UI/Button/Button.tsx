import React from 'react'
import cl from "./Button.module.css"
interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {}
export const Button:React.FC<ButtonProps> = (props) => {
    const {children, ...rest} = props
  return (
    <button className={cl.Button} {...rest}>{children}</button>
  )
}
