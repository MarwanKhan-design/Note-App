import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

const API_URL = "http://localhost:4000/api/notes";

interface Note {
    title: String,
    content: String
}

const { token } = useAuthStore.getState() as any;

export const useNoteStore = create((set) => ({
    notes: [],
    message: '',

    createNote: async (title: string, content: string) => {
        try {
            const res = await axios.post('/', { title, content }, { headers: { Authorization: `Bearer ${token}` } })
            if (res.status === 200 || res.status === 201) {
                set((state: { notes: Note[] }) => ({
                    notes: [...state.notes, { ...res.data }],
                    message: 'Note Created Successfully'
                }));
            } else {
                set({ message: 'Note not Saved' });
            }
        } catch (error) {
            console.log(error)
        }
    },

    getNotesOfUser: async () => {
        try {
            const res = await axios.get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
            set({ notes: [...res.data] })
        } catch (error) {
            console.log(error)
        }
    }

}))