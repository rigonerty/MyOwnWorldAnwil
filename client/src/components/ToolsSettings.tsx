import React, { useEffect, useState } from 'react'
import { Input } from './UI/Input/Input'
import { Button } from './UI/Button/Button'
import { User, getRoles, updateRoles } from '../store/user'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
interface props{
  user:User
}
export const ToolsSettings = ({user}:props) => {
    const [isSecretsValue, setSecretsValue] = useState("")
    const dispatch = appUseDispatch()
    const roles = appUseSelector(state=> state.user.roles)
    useEffect(()=>{
      if(roles) setSecretsValue(roles[0].join(", "))
    },[])
    const submit = ()=>{
      if(isSecretsValue){
        const arrSecret = isSecretsValue.split(",").map(a=> a.trim()).filter(a=>a!=="")
        const data = {
          id: user.id||0,
          roles: arrSecret
        }
        dispatch(updateRoles(data))
      }
    }
  return (
    <div>
        <h2>Настройки инструментов</h2>
        <hr/>
        <h3>Секреты</h3>
        <Input value={isSecretsValue} setValue={setSecretsValue} name='Уровни доступа' placeholder='Введите уровни доступа' description='Пожалуйста, вводите уровень доступа через запятую от самого низкого к высокому.' max={50}/>
        <Button onClick={submit}>Сохранить</Button>
    </div>
  )
}
