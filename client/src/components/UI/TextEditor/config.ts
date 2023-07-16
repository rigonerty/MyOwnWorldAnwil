import { CompositeDecorator } from "draft-js";

// import Immutable from 'immutable';
// import { DefaultDraftBlockRenderMap } from 'draft-js';

// const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
//   "img": {
//     element: 'img', 
//   },
// });

// export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(CUSTOM_BLOCK_RENDER_MAP);
const BLOCK_TYPES = [
    {label:"H1", style:"header-one"},
    {label:"H2", style:"header-two"},
    {label:"H3", style:"header-three"},
    {label:"H4", style:"header-four"},
    {label:"H5", style:"header-five"},
    {label:"H6", style:"header-six"},
    {label:"Blockquote", style:"blockquote"},
    {label:"UL", style:"unordered-list-item"},
    {label:"OL", style:"ordered-list-item"},
    {label:"default", style:"unstyled"}
]

const INLINE_STYLES = [
    {label:"Bold", style:"BOLD"},
    {label:"Italic", style:"ITALIC"},
    {label:"Underline", style:"UNDERLINE"},

]
export {INLINE_STYLES, BLOCK_TYPES}