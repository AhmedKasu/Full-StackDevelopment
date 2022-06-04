import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StaticLine = ({ value, text }) => {
  return (
    <>
      <p>
        {text} {value}
      </p>
    </>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = all / 3;
  const positivePercentage = (good / all) * 100;

  if (all < 1) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h1>statistics</h1>
      <StaticLine text='good' value={good} />
      <StaticLine text='bad' value={bad} />
      <StaticLine text='neutral' value={neutral} />
      <StaticLine text='all' value={all} />
      <StaticLine text='average' value={average} />
      <StaticLine text='positive' value={positivePercentage} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleBadClick = () => setBad(bad + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleBadClick} text='bad' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
