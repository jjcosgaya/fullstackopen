import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const positive = 100 * good / all + "%";
  return( all === 0 ? 
    <p>No feedback given</p> :
    <table>
      <tbody>
        <StaticLine text="good" value={good} />
        <StaticLine text="neutral" value={neutral} />
        <StaticLine text="bad" value={bad} />
        <StaticLine text="all" value={all} />
        <StaticLine text="average" value={avg} />
        <StaticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StaticLine = ({text, value}) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
    
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App