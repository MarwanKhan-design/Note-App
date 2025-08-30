import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

interface User {
    name: String,
    email: String
}

export const useAuthStore = create((set) => ({
    user: null as User | null,
    message: '',
    token: '',
    signup: async (name: string, email: string) => {
        try {
            const res = await axios.post(`${API_URL}/signup`, { name, email })
            set({ message: res.data?.message })
        } catch (error) {
            console.log(error)
        }
    },

    login: async (email: string) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email })
            set({ message: res.data?.message })
        } catch (error) {
            console.log(error)
        }
    },

    getToken: async (OTP: number, email: string) => {
        try {
            const res = await axios.post(`${API_URL}/verify`, { OTP, email })
            set({ user: res.data?.user, token: res.data?.token, message: res.data?.message })
            console.log(res.data)
            localStorage.setItem('token', res.data?.token)
            localStorage.setItem('user', res.data?.user)

        } catch (error) {
            console.log(error)
        }
    }


}));