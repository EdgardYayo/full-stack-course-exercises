/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => {
    return (
        <section>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>Has {anecdote.votes} votes</p>
            <p>For more info visit: <a href={`${anecdote.info}`} target="_blank" rel="noreferrer">{anecdote.info}</a></p>
        </section>
    )
}

export default Anecdote