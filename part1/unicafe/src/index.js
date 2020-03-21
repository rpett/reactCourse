import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({text, value}) => {

  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
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

  const all = good+bad+neutral

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={'good'} />
      <Button onClick={handleNeutralClick} text={'neutral'} />
      <Button onClick={handleBadClick} text={'bad'} />
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistics text={'good'} value={good} />
          <Statistics text={'neutral'} value={neutral} />
          <Statistics text={'bad'} value={bad} />
          <Statistics text={'all'} value={all} />
          <Statistics text={'average'} value={(good-bad) / all} />
          <Statistics text={'positive'} value={(good / all)+" %"} />
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
