import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAll, voteAnecdote } from './request/anecdotes'
import { useNotificationDispatch } from './context/NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const anecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({ type: 'NOTIFY', payload: `The anecdote is too short, needs at least 5 characters or more` })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATIONS' }), 5000)
    }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueriesData(
        ['anecdotes'],
        anecdotes.map((a) => a.id === updatedAnecdote.id ? updatedAnecdote: a) 
      )
    }
  })

  const { data, isError, isSuccess } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })


  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({ type: 'NOTIFY', payload: `You voted '${anecdote.content}'` })
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATIONS' }), 5000)
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({
      content,
      votes: 0
    })
    dispatch({ type: 'NOTIFY', payload: `You create the anecdote: '${content}'` })
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATIONS' }), 5000)

  }

  let anecdotes = null;

  if (isSuccess) {
    anecdotes = data
 }

  if (isError || !anecdotes) {
    return <span>Anecdote service no available</span>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm onCreate={onCreate} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
