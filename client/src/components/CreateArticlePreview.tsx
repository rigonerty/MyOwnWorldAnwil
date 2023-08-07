import DOMPurify from 'dompurify'
import React from 'react'
interface props{
    isCurrent:string,
    HTMLPack:{name:string;main:string;sidebar:string}[]
    SecretsHTMLPack:{name:string;main:string;sidebar:string}[]
}
export const CreateArticlePreview = ({isCurrent,HTMLPack,SecretsHTMLPack}:props) => {
  return (
     <div className={isCurrent==="preview"?"CreatePreview ToolsCreateVisible":"CreatePreview ToolsCreateHidden"} >
          {
             HTMLPack.map((block)=>{
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
          <hr/>
          <h2>Secrets: </h2>
          {
             SecretsHTMLPack.map((block)=>{
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
