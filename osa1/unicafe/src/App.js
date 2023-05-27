import { useState } from 'react'

const Title = (props) => {
  console.log("Hello")
  return (
    <h1> {props.text} </h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0 ){
    return <p>No feedback given</p>
  }
  return(
    <table>
      <tbody>
      <StatisticLine text={"good"} value={good}/>
      <StatisticLine text={"neutral"} value={neutral}/>
      <StatisticLine text={"bad"} value={bad}/>
      <StatisticLine text={"all"} value={all}/>
      <StatisticLine text={"average"} value={(good-bad)/all}/>
      <StatisticLine text={"positive"} value={good/all*100}/>
      </tbody>
    </table>
  )
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text={"give feedback"}/>
      <Button text={"good"} handleClick={() => setGood(good + 1)}/>
      <Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)}/>
      <Button text={"bad"} handleClick={() => setBad(bad + 1)}/>
      <Title text={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>  
    </div>
  )
}

export default App