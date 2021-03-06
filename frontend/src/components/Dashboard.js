import React from 'react';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Favourites from './Client/Favourites';
import Order from './Client/Order';
import Products from './Client/Products';
import Profile from './Client/Profile';
import Home from './Client/Home';
import '../css/Client.css'
import Faqs from './Client/Faqs';
import Requests from './Client/Requests';
import AddProduct from './Client/AddProduct';
import ShoppingCart from './Client/ShoppingCart';
import OrderList from './Client/OrderList';
import ViewClients from './Client/ViewClients';

function Dashboard({ location }) {

  const connectedUser = location.state.connectedUser

  return (
    <div>
      <Router>
        <Navbar connectedUser={connectedUser}/>
        <Switch>
          <Route path='/dashboard' exact component={Home}  />
          <Route path='/dashboard/favourites' render={(props) => (<Favourites {...props} connectedUser={connectedUser}/>)} />
          <Route path='/dashboard/add' exact component={AddProduct} />
          <Route path='/dashboard/view' exact component={ViewClients} />
          <Route path='/dashboard/cart' render={(props) => (<ShoppingCart {...props} connectedUser={connectedUser}/>)} />
          <Route path='/dashboard/order' render={(props) => (<Order {...props} connectedUser={connectedUser}/>)} />
          <Route path='/dashboard/products' render={(props) => (<Products {...props} connectedUser={connectedUser}/>)} />
          <Route path='/dashboard/faqs' render={(props) => (<Faqs {...props} connectedUser={connectedUser}/>)} />
          <Route path='/dashboard/orders' render={(props) => (<OrderList {...props} connectedUser={connectedUser}/>)} />
          <Route path='/dashboard/profile' render={(props) => (<Profile {...props} connectedUser={connectedUser}/>)} />
          <Route path='/dashboard/requests' component={Requests} />
        </Switch>
      </Router>
    </div>
  );
}

export default Dashboard;