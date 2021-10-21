import React from 'react'
import axios from 'axios';

function Profile({connectedUser}) {

    function handleRequestAdminAccess() {
        let user = {
            UserId: connectedUser.UserId,
            UserName: connectedUser.UserName,
            UserEmail: connectedUser.UserEmail,
            UserPassword: connectedUser.UserPassword,
            UserRole: connectedUser.UserRole,
            UserWantsAdmin: true
        };

        axios.put('http://localhost:51404/api/User', user)
            .then(res => {
                alert('Access requested!');
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            });
    }

    return (
        <div>
            Welcome:
            <p>Name: {connectedUser.UserName}</p>
            <p>Email: {connectedUser.UserEmail}</p>
            <p>Role: {connectedUser.UserRole}</p>
            {(connectedUser.UserRole === 'client') ? <button onClick={handleRequestAdminAccess}>Request admin role</button> : null }
        </div>
    )
}

export default Profile
