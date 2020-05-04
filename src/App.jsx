import React from 'react';
import Form from './components/Form'
import Signin from './components/Signin'
import GapStats from './components/GapStats'
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <div className="main">
			<BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/gap" component={GapStats} />
        </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
