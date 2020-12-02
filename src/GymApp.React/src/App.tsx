import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from './login/Login';
import TrainersList from './admin/trainers/TrainersList';

function App() {
  var isAuthenticated=false;
  if(localStorage.getItem('token')!==null){
    isAuthenticated=true;
  }  

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
            {isAuthenticated ? <TrainersList /> : <Redirect to="/login" />}
          </Route>
        </Switch>

    </Router>
  );
}

export default App;
