import React, { useState } from 'react'
import '../css/Authentication.css'

function Register(props) {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [role, setRole] = useState('Client')

    const handleSubmit = event => {
        if (email === '')
            alert("There is no email passed")
        else if (username === '')
            alert("There is no username passed")
        else if (password === '')
            alert("There are no password passed")
        else if (password !== repassword)
            alert("The passwords are not the same!")
        else
            {
                alert(`New user :\n   Email-${email}\n   Username-${username}\n   Password-${password}\n   Role-${role}`)
                props.history.push('/login')
            }
        event.preventDefault()  
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

    const handleRoleChange = event => {
        setRole(event.target.value)        
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
            <form className='Form' autoComplete="off">
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
                    <div className='flex role'>
                        <div id='role_label'>
                            <label>Role</label>
                        </div>
                        <select value={role} onChange={handleRoleChange} >
                            <option value='client'>Client</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                    <div className="right">
                        <button type='submit' onClick={handleSubmit}>Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register

