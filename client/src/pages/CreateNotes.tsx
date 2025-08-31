import { useState } from "react"
import { useNoteStore } from "../store/notesStore"
import styles from '../styles/createNotes.module.css'

const CreateNotes = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { createNote, message } = useNoteStore() as any

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (title.trim() && content.trim()) {
            await createNote(title, content)
            setTitle('')
            setContent('')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>Create New Note</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                            placeholder="Enter note title..."
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="content" className={styles.label}>Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={styles.textarea}
                            placeholder="Write your note content here..."
                            rows={6}
                            required
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitBtn}>
                            Create Note
                        </button>
                        <button type="button" className={styles.cancelBtn}>
                            Cancel
                        </button>
                    </div>
                </form>

                {message && (
                    <div className={styles.message}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreateNotes