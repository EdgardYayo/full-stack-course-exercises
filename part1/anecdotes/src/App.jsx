import { useState } from 'react'

const Button = ({text, onClick}) => <button style={{ display: 'block' }} onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState({
    anecdote: '',
    numberOfVotes: 0 
  });

  const displayRandomAnecdote = () => {
    let randomNumber = Math.floor(anecdotes.length * Math.random())

    while(randomNumber === selected) {
      randomNumber = Math.floor(anecdotes.length * Math.random())
    }

    setSelected(randomNumber);
  }

  const handleVote = () => {
    let newVotes = { ...votes };
    newVotes[selected] += 1;
    setVotes(newVotes);

    let values = Object.values(newVotes)
    let numberOfVotesOfWinnerAnectdote = Math.max(...values);
    let index = values.indexOf(numberOfVotesOfWinnerAnectdote);
    

    let mostVoted = { ...mostVotedAnecdote };
    mostVoted.anecdote = anecdotes[index];
    mostVoted.numberOfVotes = numberOfVotesOfWinnerAnectdote;
    setMostVotedAnecdote(mostVoted)

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Button text={'Next anecdote'} onClick={displayRandomAnecdote}/>
      <Button text={'Vote'} onClick={handleVote}/>
      <p>Has {votes[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      {mostVotedAnecdote.anecdote}
      <p>Has {mostVotedAnecdote.numberOfVotes} votes</p>
    </div>
  )
}

export default App