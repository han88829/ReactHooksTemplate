import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import home from "./home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={home} />
      </Switch>
    </Router>
  );
}

export default App;
