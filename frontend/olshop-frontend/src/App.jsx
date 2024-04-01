import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from '../src/pages/Login.page';
import { Home } from '../src/pages/Home.page';
import { Register } from '../src/pages/Register.page';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
