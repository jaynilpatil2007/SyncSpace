import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useProjectStore = create((set, get) => ({
    project: null,
    isCreatingProject: false,
    isJoiningProject: false,
    isLoadingProject: false,

    // ✅ CREATE PROJECT
    createProject: async (data) => {
        try {
            set({ isCreatingProject: true });

            const res = await axiosInstance.post("/getstart/create", data);

            toast.success(res.data.data || "Project created successfully");

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create project");
        } finally {
            set({ isCreatingProject: false });
        }
    },

    // ✅ JOIN PROJECT BY PASSWORD
    joinProject: async (data) => {
        try {
            set({ isJoiningProject: true });

            const res = await axiosInstance.post("/project/join", data);

            toast.success(res.data.message || "Joined project successfully");

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to join project");
        } finally {
            set({ isJoiningProject: false });
        }
    },

    // ✅ GET PROJECT DETAILS
    getProject: async (projId) => {
        try {
            set({ isLoadingProject: true });

            const res = await axiosInstance.get(`/project/${projId}`);

            set({ project: res.data.data });

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch project");
        } finally {
            set({ isLoadingProject: false });
        }
    },

    // ✅ CLEAR PROJECT (optional)
    clearProject: () => {
        set({ project: null });
    }
}));