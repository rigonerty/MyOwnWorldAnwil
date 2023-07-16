import React,{useState} from 'react'
import { login, register } from '../../../../store/user'
import { Modal } from '../../Modal/Modal'
import { Input } from '../../Input/Input'
import { Button } from '../../Button/Button'
import { appUseDispatch } from '../../../../hooks/reduxHooks'

export const UnAuth = () => {
  const [regVisible, setRegVisible] = useState(false)
  const [logVisible, setLogVisible] = useState(false)
  const [regName,setRegName] = useState("")
  const [regPassword,setRegPassword] = useState("")
  const [logEmail, setLogEmail] = useState("")
  const [logName,setLogName] = useState("")
  const [logPassword,setLogPassword] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const dispatch = appUseDispatch()
  const loginButton = async ()=>{
    if(logName && logPassword){
      const data = {
        username: logName,
        email: logEmail,
        password: logPassword
      } 
      dispatch(login(data))
      setLogVisible(false)
      setLogName("")
      setLogPassword("")  
    }

  }
  const registerButton = async ()=>{
    if(regName && regPassword){
      const data = {
        username: regName,
        email: regEmail,
        password: regPassword
      } 
      dispatch(register(data))
      setRegVisible(false)
      setRegName("")
      setRegPassword("")
    }
  }
  return (
    <div>
          <button onClick={()=>setLogVisible(!logVisible)}>Login</button>
          <button onClick={()=>setRegVisible(!regVisible)}>Register</button>
          <Modal visible={regVisible} setVisible={setRegVisible}>
            <Input value={regName} setValue={setRegName} placeholder='Ввелите сюда ваше Имя.' name='Имя'/>
            <br/>
            <Input value={regEmail} setValue={setRegEmail} placeholder='Ввелите сюда ваш email.'  name='Email'/>
            <br/>
            <Input value={regPassword} setValue={setRegPassword} placeholder='Ввелите сюда ваш пароль.' name='Пароль'/>
            <br/>
            <Button onClick={registerButton}>Создать</Button>
          </Modal>
          <Modal visible={logVisible} setVisible={setLogVisible}>
            <Input value={logName} setValue={setLogName} placeholder='Ввелите сюда ваше Имя.' name='Имя'/>
            <br/>
            <Input value={logEmail} setValue={setLogEmail} placeholder='Ввелите сюда ваш email.'  name='Email'/>
            <br/>
            <Input value={logPassword} setValue={setLogPassword} placeholder='Ввелите сюда ваш пароль.'  name='Пароль'/>
            <br/>
            <Button onClick={loginButton}>Войти</Button>
          </Modal>
    </div>
  )
}
