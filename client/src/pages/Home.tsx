import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import { Link, Navigate } from "react-router-dom"
import styles from '../styles/dashboard.module.css'
import { useNoteStore } from "../store/notesStore"

const Home = () => {
    const { user, isTokenValid, loading } = useAuthStore()
    const { notes, getNotesOfUser } = useNoteStore() as any

    useEffect(() => {
        getNotesOfUser()
    }, [])

    if (loading) return <p>Loading...</p>
    if (!isTokenValid || !user) return <Navigate to="/login" />

    return (
        <>
            <div className={styles.container}>



                {/* User Card */}
                <div className={styles.userCard}>
                    <h3>Welcome, {user.name} !</h3>
                    <p>Email: {user.email}</p>
                </div>

                {/* Create Note Button */}
                <Link to={'/create/note'}>
                    <button className={styles.createBtn}>Create Note</button>
                </Link>

                {/* Notes */}
                <div className={styles.notesSection}>
                    <h4>Notes</h4>
                    <ul className={styles.notesList}>
                        {notes.map((note: any, idx: string) => (
                            <li key={idx} className={styles.noteItem}>
                                <span>{note.title}</span>
                                <button className={styles.deleteBtn}>🗑</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home
