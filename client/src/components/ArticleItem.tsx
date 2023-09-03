import React, { useEffect, useState } from 'react'
import { Article } from '../models/Tools'
import { EditorState } from 'draft-js';
import { options } from './UI/TextEditor/BlockRenderFunction';
import { stateToHTML } from 'draft-js-export-html';
import DOMPurify from 'dompurify';
import { convertFromRaw } from 'draft-js';
interface props{
    article:Article;
    userRoles:string[];
    creatorId:number
}

export const ArticleItem = ({article,userRoles,creatorId}:props) => {
    const [isMainHTMLContent, setMainHTMLContent] = useState<{name:string;main:any;sidebar:any}[]>([]) 
    const [isSecretsContent, setSecretsContent] = useState<{name:string;main:any;sidebar:any}[]>([])
    useEffect(()=>{
      let mainAccess = false;
      for(const userRole of userRoles){
        if(article.roles.find(a=>a.includes(userRole))){
          mainAccess = true
        }
      }
      if(mainAccess){
          const newArr = isMainHTMLContent.map(a=>a)
          for(const MainArtilce of article.article){
              const main = stateToHTML(convertFromRaw(MainArtilce.main),options)
              const sidebar = stateToHTML(convertFromRaw(MainArtilce.sidebar),options)
              newArr.push({name:MainArtilce.name,main,sidebar})
          }        
          setMainHTMLContent(newArr)
          const newSecretArr = isSecretsContent.map(a=>a)
          for(const SecretBlock of article.secrets){
              let access = false
              for(const userRole of userRoles){
                if(SecretBlock.roles.find(a=>a.includes(userRole))){
                  access = true
                }
              }
              if(access){
                const main = stateToHTML(convertFromRaw(SecretBlock.main),options)
                const sidebar = stateToHTML(convertFromRaw(SecretBlock.sidebar),options)    
                newSecretArr.push({name:SecretBlock.name, main,sidebar})                 
              }
     
          }
          setSecretsContent(newSecretArr)        
      }
        
    },[])
  return (
    <div className='CreatePreview'>
        <h1>{article.name}</h1>
        {isMainHTMLContent.length?
             isMainHTMLContent.map((block)=>{
              return (
                <>
                  <h2>{block.name}</h2>
                  <div id={block.name}>
                    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(block.main)}} className='Preview'>
                    </div>          
                    <div className='PreviewSidebar Preview' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(block.sidebar)}}>
                    </div> 
                  </div>                
                </>

              )
            })
            :<h1>У вас нет доступа к этой статье.</h1>
          }
        {
            isSecretsContent.map((block)=>{
              return (
                <>
                  <h2>{block.name}</h2>
                  <div id={block.name}>
                    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(block.main)}} className='Preview'>
                    </div>          
                    <div className='PreviewSidebar Preview' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(block.sidebar)}}>
                    </div> 
                  </div>                
                </>

              )
            })
          }
    </div>
  )
}
