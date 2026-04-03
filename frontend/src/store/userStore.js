import { create } from "zustand"
import {axiosInstance} from "../lib/axios.js"

export const userStore = create({
    authUser: null,
    isSignin: false,

    signup: async(set)=>{
        set({
            isSignin:true
        })
        try{
            const res= await axiosInstance.post("/auth/signup", data);
            set({
                authUser: res.data
            })
            toast.success(" Signeup Succesfully ")
        }
        catch(error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({
                isSignin:false
            })
        }
    }
})