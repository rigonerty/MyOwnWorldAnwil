
import { appUseSelector } from '../hooks/reduxHooks'
import { ToolsSettings } from './ToolsSettings'
import { UserSettings } from './UserSettings'

export const Settings = () => {
  const user = appUseSelector((state)=> state.user)
  return (
    <div>
        <ToolsSettings user={user}/>
        <UserSettings user={user}/>
    </div>
  )
}
