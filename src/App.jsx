import React from 'react';
import Form from './components/Form'
import ProfitChart from "./components/ProfitChart"

const App = () => {
  return (
    <div className="App">
      <h2>Trading Position Calculator</h2>
      <div className="main">
        <Form />
        <ProfitChart />
      </div>
    </div>
  );
}

export default App;
