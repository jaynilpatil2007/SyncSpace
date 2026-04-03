import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { toast } from "react-hot-toast";

export const userStore = create((set) => ({
    authUser: null,
    isCheckAuth: true,

    check: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in auth: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckAuth: false });
        }
    },

    signup: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({
                authUser: res.data.data
            })
            toast.success("Sign up Succesfully")
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    },
    login: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data.data })
            toast.success("Login Succesfully")
        }
        catch (error) {
            toast.error(error.response.data.message);

        }
    },
    logout: async (data) => {
        try {
            await axiosInstance.post("/auth/logout", data);
            set({ authUser: null })
            toast.success("Logout Succesfully")
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))