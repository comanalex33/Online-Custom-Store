import React, { useState } from 'react';
 
function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // handle button click of login form
  const handleLogin = () => {
    props.history.push('/dashboard');
  }
 
  return (
    <div>
      Login page<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
    
        <input type="button" value={'Login'} onClick={handleLogin} disabled={loading} /><br />
      <br />
      <div>
          Don't have an account yet? 
            <input type="button" value={'Register'} disabled={loading} /><br />
      </div>
      
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
}
 
export default Login;