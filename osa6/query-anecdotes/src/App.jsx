import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const App = () => {
  const queryClient = useQueryClient()

  const addVote = votedAnecdote => {
    axios.put(`http://localhost:3001/anecdotes/${votedAnecdote.id}`, votedAnecdote).then(res => res.data)
  }

  const voteAnecdoteMutation = useMutation({ mutationFn: addVote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: false,
    refetchOnWindowFocus: false
  })
  if(result.isLoading) {
    return <div>Loading...</div>
  }
  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
