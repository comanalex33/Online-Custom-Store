import React from 'react'

function Profile({connectedUser}) {
    return (
        <div>
            Welcome:
            <p>Name: {connectedUser.UserName}</p>
            <p>Email: {connectedUser.UserEmail}</p>
            <p>Role: {connectedUser.UserRole}</p>
        </div>
    )
}

export default Profile
