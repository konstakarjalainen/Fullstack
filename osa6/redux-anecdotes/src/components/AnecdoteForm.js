import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const Form = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(text))
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default Form
