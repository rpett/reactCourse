import React from 'react';
import ReactDOM from 'react-dom';


const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you {props.age}!</p>
    </div>
  )
}

const App = () => {

  return (
    <div>
      <h1>Gertins!</h1>
      <Hello name="Gerog" age={1+2}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))