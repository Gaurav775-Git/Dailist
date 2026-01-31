import {create} from "zustand"
export const Function= create((set,get)=>({
   
    open:false,
    clicked: ()=>set((state)=>(
        {
            open: !state.open
        }))
    

}))
