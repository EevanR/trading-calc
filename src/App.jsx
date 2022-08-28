import React from 'react';
import Panes from './components/Panes'
import Signin from './components/Signin'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "@stripe/stripe-js"
import Receipt from './components/Receipt';
import Terms from './components/Terms';
import HowTo from './components/HowTo';

const App = () => {
  return (
    <div className="App">
      <div className="main">
			<BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/panes" component={Panes} />
          <Route exact path="/receipt" component={Receipt} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/howto" component={HowTo} />
        </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
