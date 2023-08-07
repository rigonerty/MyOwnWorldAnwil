import { Tools } from '../components/Tools';
import { CreateArticle } from '../components/CreateArticle';
import { Profile } from '../components/Profile';
import Home from '../components/Home';
import { Friends } from '../components/Friends';
import { CreateCharacter } from '../components/CreateCharacter';
import { Settings } from '../components/Settings';
import { Article } from '../components/Article';
export const privateRoutes = [
    {path:"/tools", element:<Tools/>, exact: true},
    {path:"/tools/createPost", element:<CreateArticle/>, exact: true},
    {path:"/tools/createCharacter", element:<CreateCharacter/>, exact: true},
    {path:"/user/settings", element:<Settings/>, exact: true},
    {path:"/user/:id", element:<Profile/>, exact: true},
    {path:"/", element:<Home/>, exact:true},
    {path:"/user/friends", element: <Friends/>, exact: true},
    {path:"/user/:userId/article/:articleId", element: <Article/>, exact: true}
]

export const publicRoutes = [
    {path:"/", element:<Home/>, exact:true}
]