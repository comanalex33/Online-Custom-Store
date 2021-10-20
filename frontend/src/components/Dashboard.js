import React from 'react';
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Favourites from './Client/Favourites';
import Order from './Client/Order';
import Products from './Client/Products';
import Profile from './Client/Profile';
import Home from './Client/Home';
import '../css/Client.css'
import Faqs from './Client/Faqs';

function Dashboard({ location }) {

  const history = useHistory()
  const connectedUser = location.state.connectedUser

  return (
    <div>
      <Router>
        <Navbar />
        {/* Welcome {connectedUser.UserName} {connectedUser.UserPassword} {connectedUser.UserEmail} {connectedUser.UserRole}<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" /> */}
        <Switch>
          <Route path='/dashboard' exact component={Home}  />
          <Route path='/dashboard/favourites' exact component={Favourites} />
          <Route path='/dashboard/order' component={Order} />
          <Route path='/dashboard/products' component={Products} />
          <Route path='/dashboard/faqs' render={(props) => (<Faqs {...props} connectedUser={connectedUser}/>)} />
          <Route path='/dashboard/profile' render={(props) => (<Profile {...props} connectedUser={connectedUser}/>)} />
        </Switch>
      </Router>
    </div>
  );
}

export default Dashboard;