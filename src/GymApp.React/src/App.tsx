import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from './login/Login';
import TrainersList from './admin/trainers/TrainersList';
import ClientsList from './admin/clients/ClientsList';
import Admin from './admin/Admin';
import { history } from "./history";

function App() {


  return (
    <Router history={history}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
