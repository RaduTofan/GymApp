import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from './login/Login';
import TrainersList from './admin/trainers/TrainersList';
import { history } from "./history";

function App() {


  return (
    <Router history={history}>
      <div>
        <h1 style={{ margin: "auto", width: "50%" }}>Welcoom!</h1>

      </div>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <TrainersList />
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
