import React, { useState } from 'react';
import '../css/Authentication.css'
 
function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // handle button click of login form
  const handleLoginButtonClick = () => {
    props.history.push('/dashboard');
  }

  const handleRegisterButtonClick = () => {
    props.history.push('/register')
  }
 
  return (
    <div className='Container'>
      <p id='title'>Login page</p>
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
    
        <input type="button" value={'Login'} onClick={handleLoginButtonClick} disabled={loading} /><br />
      <br />
      <div>
          Don't have an account yet? 
            <input type="button" value={'Register'} onClick={handleRegisterButtonClick} disabled={loading} /><br />
      </div>
      
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
}
 
export default Login;