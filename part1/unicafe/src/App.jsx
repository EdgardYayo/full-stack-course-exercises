import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, data }) => <tr><td>{text}</td><td>{data}</td></tr>
const StatisticPositivePercent = ({ text, data }) => <tr><td>{text}</td><td>{data}%</td></tr>


const Statistics = ({ good, bad, neutral, all, avg }) => {
  return (
    <>
      <h1>Statistics</h1>
      {all ===  0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text={'good'} data={good}/>
            <StatisticLine text={'neutral'} data={neutral}/>
            <StatisticLine text={'bad'} data={bad}/>
            <StatisticLine text={'all'} data={all}/>
            <StatisticLine text={'average'} data={avg}/>
            <StatisticPositivePercent  text={'positive'} data={all === 0 ? 0 : (good / all) * 100}/>
          </tbody>
        </table>
      )}
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)

  const handleGood = () => {
    setAll(all + 1);
    setGood(good + 1);
    let average = all === 0 ? 0 : (good - bad) / all
    setAvg(average);
  }

  const handleNeutral = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
    let average = all === 0 ? 0 : (good - bad) / all
    setAvg(average);
  }

  const handleBad = () => {
    setAll(all + 1);
    setBad(bad + 1);
    let average = all === 0 ? 0 : (good - bad) / all
    setAvg(average);
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button text={'good'} onClick={handleGood}/>
      <Button text={'neutral'} onClick={handleNeutral}/>
      <Button text={'bad'} onClick={handleBad}/>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} avg={avg} />
    </>
  )
}

export default App
