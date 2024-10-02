import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { notifyWithTimeout } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitNewNote = async (e) => {
        e.preventDefault()
        let content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(createNewAnecdote(content))
        dispatch(notifyWithTimeout(`Your created the anecdote: '${content}'`, 2))
    }


    return (
        <>
            <h2>create new</h2>
            <form onSubmit={submitNewNote}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit' >create</button>
            </form>
        </>
    )
}

export default AnecdoteForm;