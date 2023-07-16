import Draft from "draft-js";
import { FloatBlock } from "./BlockComponent/FloatBlock/FloatBlock";
import Immutable from 'immutable';
const blockRenderMap = Immutable.Map({
  'FloatComponent': {
    element: 'div',
    wrapper: <FloatBlock />,
  }
});
export const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

export const blockRendererFn = (contentBlock:any) => {
  // const type = contentBlock.getType();
  // if (type === 'FloatComponent') {
  //   return {
  //     component: FloatBlock,
  //     editable: true,
  //     props: {},
  //   };
  // }
}