import React from 'react';
import Panes from './components/Panes'
import Signin from './components/Signin'
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <div className="main">
			<BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/panes" component={Panes} />
        </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
