import React, { useEffect, useState } from 'react'
import { ArticlesMainBlock, updateHTML } from './UI/AllArticlesMainBlock/ArticlesMainBlock';
import { Button } from './UI/Button/Button';
interface props{
    isCurrent:string;
    updateHTML:(data:updateHTML)=>void;
    setToggleFocus:(data:any)=>void;
    value?:{roles:string[],name:string,main:any,sidebar:any}[]
}
export const CreateArticleSecrets = ({isCurrent,setToggleFocus,updateHTML,value}:props) => {
    const [isCountOfEditors,setCountOfEditors] = useState(value?value.length:1)
    const AllArticleBlocks = ()=>{
        const arr = []
        for(let i=0; i <isCountOfEditors; i++){
            arr.push(<ArticlesMainBlock index={i} setToggleFocus={setToggleFocus} updateHTML={updateHTML} key={i} type='secret' value={value?value[i]:undefined}/>)

        }
        return arr
    }
    const articles = AllArticleBlocks()
  return (
    <div className={isCurrent==="secrets"?"ToolsCreateVisible":"ToolsCreateHidden"} >
        <div>
            {articles}
        </div>
        <Button onClick={()=>setCountOfEditors(isCountOfEditors+1)}>+</Button>  
    </div>
  )
}
