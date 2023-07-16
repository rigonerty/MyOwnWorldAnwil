import React from 'react'
import cl from "./FloatBlock.module.css"
export const FloatBlock = (props:any) => {
const {block, contentState} = props;
  return (
      <div className={cl.FloatBlock} style={{border: "1px solid white", zIndex: 10}}>
        {props.children}
      </div>
  )
}
