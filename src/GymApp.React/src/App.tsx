import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from './login/Login';
import TrainersList from './admin/trainers/TrainersList';
import Admin from './admin/Admin';
import { history } from "./history";

function App() {


  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
