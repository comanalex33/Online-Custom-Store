import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Order from './components/Client/Order';
import Home from './components/Client/Home';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/order" component={Order} />
          </Switch>
    </BrowserRouter>
  </div>
);
  
}

export default App;
