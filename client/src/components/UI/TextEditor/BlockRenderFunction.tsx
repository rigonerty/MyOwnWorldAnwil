import Draft from "draft-js";
import { FloatBlock } from "./BlockComponent/FloatBlock/FloatBlock";
import Immutable from 'immutable';
import { CompositeDecorator } from "draft-js";
import { AtomicBlockUtils } from "draft-js";
import { EditorState } from "draft-js";
import { Modifier } from "draft-js";
import { get } from "http";

const blockRenderMap = Immutable.Map({
  'FloatComponent': {
    element: 'div',
    wrapper: <FloatBlock />,
  }
});
// const decorators = new CompositeDecorator([{

// }])


export const options = {
  blockRenderers: {
    FloatComponent: (block:any) => {
      return '<div class="FloatComponent">' + block.getText() + '</div>';
    },
  },
  entityStyleFn: (entity:any) => {
    const entityType = entity.get('type');
    if (entityType === 'IMAGE_FLOAT') {
      const data = entity.getData();
      return {
        element: 'img',
        attributes: {
          src: data.src,
          alt:data.alt,
          class: "FloatComponentImage"
        },
        style: {
          width:data.width,
          height:data.height
        },
      };
    }
  },
};


export const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

interface addHandlerTypes{

  src?:string,
  width?:string,
  height?:string,
  alt?:string,

  float?:boolean,
  id?:string|number,

  type:string
}
const insertAtomicBlock = (editorState:any,entityType:string, data:addHandlerTypes)=>{
  const content = editorState.getCurrentContent()
  const contentWithEntity = content.createEntity(entityType,"MUTABLE",data)
  const entityKey = contentWithEntity.getLastCreatedEntityKey()

  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
}

export const addHandler = (value:addHandlerTypes, editorState:any,setEditorState:any)=>{
  const newEditorState = insertAtomicBlock(editorState,value.type, value)
  setEditorState(newEditorState)
}

export const Media = (props:any) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {src,width,height,alt}:any = entity.getData();
  const type = entity.getType();
  let media;
  if (type === 'IMAGE_FLOAT') {
    media = <img src={src} style={{width,height,}} alt={alt} className='FloatComponentImage'/>;
  }
  return media;
};
export const Table = (props:any)=>{
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {float,id}:any = entity.getData();
  const type = entity.getType();
  let table;
  const idTable = "TABLE_"+id
  if (type === 'TABLE') {
    table = <table id={idTable} style={float?{float:"right",clear:"right"}:{}}></table>;
  }
  return table;
}
export const TableCell = (props:any)=>{
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {idTable}:any = entity.getData();
  const type = entity.getType();
  let table;
  if (type === 'TABLE_CELL') {
    table = <td>{props.children}</td>;
  }
  return table;
}
