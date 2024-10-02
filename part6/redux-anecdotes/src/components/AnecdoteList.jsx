import { useDispatch, useSelector } from "react-redux"
import { updateVoteAnecdote } from "../reducers/anecdoteReducer"
import { notifyWithTimeout } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if(filter === 'ALL') {
            return anecdotes
        }

        return anecdotes.filter((anecdote) => {
            let content = anecdote.content.toLowerCase()

            return content.includes(filter.toLowerCase())
        })
    })

    const dispatch = useDispatch()

    const vote = (id) => {

        let currentAnecdote = anecdotes.find((a) => a.id === id);

        dispatch(updateVoteAnecdote(id))
        dispatch(notifyWithTimeout(`You voted for '${currentAnecdote.content}'`, 2))
        
    }

    return (
        <>
            {Array.from(anecdotes).sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )

}

export default AnecdoteList