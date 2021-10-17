import React from 'react';
import { useHistory } from 'react-router-dom'

function Dashboard({ location }) {

  const history = useHistory()
  const connectedUser = location.state.connectedUser

  // handle click event of logout button
  const handleLogout = () => {    
    history.push('/login');
  }
 
  return (
    <div>
      Welcome {connectedUser.UserName} {connectedUser.UserPassword} {connectedUser.UserEmail} {connectedUser.UserRole}<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Dashboard;