import { useState } from 'react'

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  let score = props.good - props.bad
  let positive = (props.good/all)*100

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={score} />
          <StatisticLine text="positive" value={positive} extra="%" />
        </tbody>
      </table>
    </div>
  )
  

}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>

)
  
const StatisticLine = (props) => (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.extra}</td>
    </tr>
)



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)

  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App