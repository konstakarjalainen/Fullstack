import { useState } from 'react'

const Votes  = (props) => <p>has {props.votes} votes</p>

const Header = (props) => <h1>{props.text}</h1>



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const array = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)

  const [mostVotes, setMostVotes] = useState(0)

  const [points, setPoints] = useState(array)


  const checkHighest = (newPoints) => {
    console.log("Checking highest")
    if (newPoints > points[mostVotes]){
      setMostVotes(selected)
    }
  }

  const addPoint = (selected) => {
    setPoints(prevPoints => {
      console.log("Voting")
      const copy = [...prevPoints]
      copy[selected] += 1
      checkHighest(copy[selected])
      return copy
    })
  }

  const getRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      <Header text={"Anecdote of the day"}/>
      <p>{anecdotes[selected]}</p>
      <Votes votes={points[selected]} />
      <button onClick={() => addPoint(selected)}>{"vote"}</button>
      <button onClick={getRandom}> {"next anecdote"}</button>
      <Header text={"Anecdote with most votes"}/>
      <p>{anecdotes[mostVotes]}</p>
      <Votes votes={points[mostVotes]}/>
    </div>
  )
}

export default App
