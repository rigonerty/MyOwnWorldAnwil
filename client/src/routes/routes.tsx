import { Tools } from '../components/Tools';
import { CreateArticle } from '../components/CreateArticle';
import { UserSettings } from '../components/UserSettings';
import { Profile } from '../components/Profile';
import Home from '../components/Home';
import { Friends } from '../components/Friends';
export const privateRoutes = [
    {path:"/tools", element:<Tools/>, exact: true},
    {path:"/tools/createPost", element:<CreateArticle/>, exact: true},
    {path:"/user/settings", element:<UserSettings/>, exact: true},
    {path:"/user/:id", element:<Profile/>, exact: true},
    {path:"/", element:<Home/>, exact:true},
    {path:"/user/friends", element: <Friends/>, exact: true}
]

export const publicRoutes = [
    {path:"/", element:<Home/>, exact:true}
]