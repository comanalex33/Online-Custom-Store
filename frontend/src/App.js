import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/admin_dashboard" component={AdminDashboard} />
            <Route path="/register" component={Register} />
          </Switch>
    </BrowserRouter>
  </div>
);
  
}

export default App;
