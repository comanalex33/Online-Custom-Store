import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import '../css/Authentication.css'
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const history = useHistory()

  useEffect(() => {
    axios.get('http://localhost:5000/api/User')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function found(username, password) {
    for (const user of users) {
      if (user.name === username && user.password === password) {
        console.log(user.name)
        return user
      }
    }
    return null
  }

  // handle button click of login form
  const handleLoginButtonClick = () => {
    const user = found(username, password)
    if (user !== null) {
      history.push('/dashboard', { connectedUser: user });
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
      <div className='Form'>
        <div className='center'>
          <input className="center_content input_text" placeholder='Username' type="text" value={username} autoComplete="new-password" onChange={handleUsernameChange} />
        </div>
        <div className='center'>
          <input className="center_content input_text" placeholder='Password' type="password" value={password} autoComplete="new-password" onChange={handlePasswordChange} />
        </div>
        <div className='center'>
          <button onClick={handleLoginButtonClick}>Login</button>
        </div>
        <div className='center go-to-registration'>
          Don't have an account yet?
          <Link to='/register'>Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;