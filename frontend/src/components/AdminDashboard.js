import React from 'react'

function AdminDashboard({ location }) {

    const connectedUser = location.state.connectedUser

    return (
        <div>
            Role: {connectedUser.UserRole}
        </div>
    )
}

export default AdminDashboard
