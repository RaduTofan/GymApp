import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from './login/Login';

function App() {
  return (
    <Router>
      <div>
          <h1 style={{margin:"auto",width:"50%"}}>Welcoom!</h1>

        </div>
       
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>

    </Router>
  );
}

export default App;
