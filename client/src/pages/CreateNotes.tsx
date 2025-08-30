import { useState } from "react"
import { useNoteStore } from "../store/notesStore"

const CreateNotes = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const { createNote } = useNoteStore() as any

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await createNote(title, content)
    }

    return <>
        <form>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="title" />
            <button onClick={handleSubmit}>Create Note</button>
        </form>

    </>
}

export default CreateNotes