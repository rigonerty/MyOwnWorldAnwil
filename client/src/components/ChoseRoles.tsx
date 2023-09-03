import React from 'react'
import { Select } from './UI/Select/Select'
import { appUseSelector } from '../hooks/reduxHooks'
interface props{
    isAccess:string[];
    setAccess:(smth:string[])=>void
}
export const ChoseRoles = ({isAccess,setAccess}:props) => {
    const roles = appUseSelector(state=>state.user.roles)
    const Secrets=(e:string)=>{
        if(roles){
        const newRoles = [] 
        let access = false
        for(const role of roles[0]){
            if(role ===e){
            access=true
            }  
            if(access) {
            newRoles.push(role)
            } 
        }      
        setAccess(newRoles)
        }
    }
  return (
    <Select onChange={(e)=>{Secrets(e.target.value)}}>
        {roles&&roles[0].map((a,i)=>{
        
        return a===isAccess[0]?<option value={a} key={i} selected>{a}</option>:<option value={a} key={i}>{a}</option>
        })}
    </Select>
  )
}
