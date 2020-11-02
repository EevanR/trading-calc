import React from 'react';
import Form from './components/Form'
import Signin from './components/Signin'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HourlySentiment from './components/HourlySentiment';

const App = () => {
  return (
    <div className="App">
      <div className="main">
			<BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/backtest" component={HourlySentiment} />
        </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
