import { create } from "zustand";
import axios from "axios";

const API_URL = "https://note-app-pearl-nine.vercel.app/api/notes";

interface Note {
    title: String,
    content: String
}


export const useNoteStore = create((set) => ({
    notes: [],
    message: '',

    createNote: async (title: string, content: string) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post(`${API_URL}/`, { title, content }, { headers: { Authorization: `Bearer ${token}` } })
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
            const token = localStorage.getItem('token')
            const res = await axios.get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
            set({ notes: [...res.data] })
        } catch (error) {
            console.log(error)
        }
    },

    deleteNote: async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 200) {
                set((state: any) => ({
                    notes: state.notes.filter((note: any) => note._id !== id)
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

}))