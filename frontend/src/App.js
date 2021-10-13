import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <div>
        <div className="header">
        </div>
        <div className="content">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </div>
);
  
}

export default App;
