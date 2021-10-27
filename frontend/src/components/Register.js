import React, { useState } from 'react'
import axios from 'axios';
import '../css/Authentication.css'

function Register(props) {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')

    function handleSubmit() {

        if(password !== repassword) {
            alert(`Password missmatch!`)
            return
        }

        let user = {
            name: username,
            email: email,
            password: password,
            role: 'client',
            wantsAdmin: false
        };

        axios.post('http://localhost:5000/api/User', user)
            .then(res => {
                alert('User added succesfully!');
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            });
    }

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const handleRePasswordChange = event => {
        setRePassword(event.target.value)
    }

    function handleShowPassword() {
        var passwordField = document.getElementById("password");
         if (passwordField.type === "password") {
             passwordField.type = "text";
         } else {
             passwordField.type = "password";
         }
    }

    return (
        <div className='Container'>
            <div>
                <label id='title'>Register</label>
            </div>
            <div className='Form'>
                <div>
                    <div className="center">
                        <input className="center_content input_text" placeholder="E-mail" type='text' value={email} onChange={handleEmailChange} />
                    </div>
                    <div className="center">
                        <input className="center_content input_text" placeholder="Username" type='text' value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className="center">
                        <input className="center_content input_text" autoComplete="new-password" placeholder="New Password"  type='password' value={password} id='password' onChange={handlePasswordChange} />
                    </div>
                    <div className="right">
                        <input type='checkbox' name='Show password' onChange={handleShowPassword} />
                        <label>Show password</label>
                    </div>
                    <div className="center">
                        <input className="center_content input_text" autoComplete="new-password" placeholder="Re-enter Password" value={repassword}  type='password' onChange={handleRePasswordChange} />
                    </div>
                    <div className="right">
                        <button onClick={handleSubmit}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register

