import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";


export const appUseDispatch:()=>AppDispatch = useDispatch
export const appUseSelector: TypedUseSelectorHook<RootState> = useSelector