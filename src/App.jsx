import React from 'react';
import Panes from './components/Panes'
import Signin from './components/Signin'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "@stripe/stripe-js"
import Canceled from './components/Canceled';
import Success from './components/Success';

const App = () => {
  return (
    <div className="App">
      <div className="main">
			<BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/panes" component={Panes} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/canceled" component={Canceled} />
        </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
