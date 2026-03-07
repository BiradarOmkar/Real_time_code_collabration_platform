import {create} from 'zustand'
import {persist} from 'zustand/middleware'
export const useAuthStore=create(
    persist(
    (set)=>({
    user:null,
    token:null,

    setUser:(userData)=>{
        console.log("Storing user data in state");
       set({user:userData})
    },

    logout:()=>{
        set({
            user:null,
        })
    }

})))