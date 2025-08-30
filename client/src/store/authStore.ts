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
    loading: boolean;
    signup: (name: string, email: string) => Promise<void>;
    login: (email: string) => Promise<void>;
    getToken: (OTP: number, email: string) => Promise<void>;
    checkToken: () => Promise<void>;
}>((set) => ({
    user: null,
    message: '',
    token: '',
    isTokenValid: false,
    loading: true, // start as loading
    signup: async (name, email) => { /* unchanged */ },
    login: async (email) => { /* unchanged */ },
    getToken: async (OTP, email) => { /* unchanged */ },
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
}))
