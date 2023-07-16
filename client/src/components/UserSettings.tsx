import React, {useState} from 'react'
import { appUseDispatch, appUseSelector } from '../hooks/reduxHooks'
import { Input } from './UI/Input/Input'
import { Button } from './UI/Button/Button'
import { updateData } from '../store/user'
import { CustomErrorForInputs } from './UI/CustomErrorForInputs/CustomErrorForInputs'

export const UserSettings = () => {
    const user = appUseSelector((state)=> state.user)
    const dispatch = appUseDispatch()
    const [isValueName, setValueName] = useState(""+user.username)
    const [isValueEmail, setValueEmail] = useState(""+user.email)
    const [isValueNewPassword, setValueNewPassword] = useState("")
    const [isValueOldPassword, setValueOldPassword] = useState("")
    const [isValueImg, setValueImg] = useState<any>()
    const [isValid, setValid] =  useState(true)
    const updateHandler = ()=>{
      if(isValueImg){
        const reader = new FileReader()
        reader.readAsDataURL(isValueImg[0])
        reader.onload = ()=>{
          const data = {
            username: isValueName,
            email: isValueEmail,
            password: isValueOldPassword?isValueOldPassword:null,
            newPassword: isValueNewPassword?isValueNewPassword:null,
            img: reader.result as string,
            id: user.id?user.id:0
          }
          dispatch(updateData(data))        
        }        
      }else if(isValid){
          const data = {
            username: isValueName,
            email: isValueEmail,
            password: isValueOldPassword?isValueOldPassword:null,
            newPassword: isValueNewPassword?isValueNewPassword:null,
            img: null,
            id: user.id?user.id:0
          }
          dispatch(updateData(data)) 
      }


    }
    const Valid = (value:string)=>{
      if(value.length < 20 && value.length > 4){
        return true
      }
      setValid(false)
      return false
    }
    const ValidEmail = ()=>{
      if(isValueEmail.length < 30 && isValueEmail.length > 8){
        return true
      }
      return false
    }
  return (
    <div>
        <Input 
          value={isValueName} 
          setValue={setValueName} 
          name='username' 
          placeholder='Имя пользователя'
          min={4} max={20}/>
          <CustomErrorForInputs text='Имя должно содержать минимум 4 и максимум 20 символов' condition={()=>Valid(isValueName)}/>
        <Input 
          value={isValueEmail} 
          setValue={setValueEmail} 
          name='email' 
          placeholder='почта пользователя'
          min={4} max={20}/>
        <CustomErrorForInputs text='Почта должнa содержать минимум 8 и максимум 20 символов' condition={ValidEmail}/>
        <Input 
          value={isValueOldPassword} 
          setValue={setValueOldPassword} 
          name='Пароль' 
          placeholder='Пароль пользователя'
          min={4} max={20}/>
        <Input 
          value={isValueNewPassword} 
          setValue={setValueNewPassword} 
          name='Новый пароль' 
          placeholder='Новый пароль пользователя'
          min={4} max={20}/>
        {isValueNewPassword && <CustomErrorForInputs text='Новый пароль должен содержать минимум 4 и максимум 20 символов' condition={()=>Valid(isValueNewPassword)}/>}
        <Input setValue={setValueImg} name='Аватар' placeholder='Новый аватар пользователя' type='file' description='Пожайлуста выбирайте квадратные изображения, иначе ваша ава будет выглядеть не корректно.'/>            
        <Button onClick={updateHandler}>Сохранить</Button>
    </div>
  )
}
