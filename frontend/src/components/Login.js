import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import '../css/Authentication.css'
 
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const history = useHistory()

  useEffect(() => {
    axios.get('http://localhost:51404/api/User')
    .then(res => {
      setUsers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  function found(username, password) {
    for(const user of users) {
      if(user.UserName === username && user.UserPassword === password)
        return user
    }
    return null
  }
 
  // handle button click of login form
  const handleLoginButtonClick = () => {
    const user = found(username, password)
    if(user !== null) {
      //if(user.UserRole === 'client' )
        history.push('/dashboard', { connectedUser: user });
      //else
        //history.push('/admin_dashboard', { connectedUser: user });
    }
    else
      alert("Wrong credentials")
  }

  const handleRegisterButtonClick = () => {
    history.push('/register');
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
}

const handlePasswordChange = event => {
    setPassword(event.target.value)
}

  return (
    <div className='Container'>
      <p id='title'>Login page</p>
      <div>
        Username<br />
        <input type="text" value={username} autoComplete="new-password" onChange={handleUsernameChange} />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" value={password} autoComplete="new-password" onChange={handlePasswordChange} />
      </div>
    
        <input type="button" value={'Login'} onClick={handleLoginButtonClick} /><br />
      <br />
      <div>
          Don't have an account yet? 
          <input type="button" value={'Register'} onClick={handleRegisterButtonClick} /><br />
      </div>
      
    </div>
  );
}
 
export default Login;