import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

interface User {
    name: String,
    email: String
}

export const useAuthStore = create<{
    user: User | null;
    message: string;
    token: string;
    isTokenValid: boolean;
    signup: (name: string, email: string) => Promise<void>;
    login: (email: string) => Promise<void>;
    getToken: (OTP: number, email: string) => Promise<boolean | undefined>;
    checkToken: () => Promise<void>;
    loading: boolean;
}>((set) => ({
    loading: true,
    user: null as User | null,
    message: '',
    token: '',
    isTokenValid: false,
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
            if (res.data?.token) {

                set({ user: res.data?.user, token: res.data?.token, message: res.data?.message })
                console.log(res.data)
                localStorage.setItem('token', res.data?.token)
                localStorage.setItem('user', JSON.stringify(res.data?.user))
                return true
            }
            return false

        }
        catch (error) {
            console.log(error)
        }
    },
    checkToken: async () => {
        try {
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('user')

            if (!token || !user) {
                set({ isTokenValid: false, loading: false })
                return
            }

            const parsedUser = JSON.parse(user)
            const res = await axios.post(
                `${API_URL}/check-token`,
                { email: parsedUser.email },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (res.data.isValid) {
                set({ isTokenValid: true, token, user: parsedUser, loading: false })
            } else {
                set({ isTokenValid: false, loading: false })
            }
        } catch (error) {
            console.log(error)
            set({ isTokenValid: false, loading: false })
        }
    }

}));