import React from 'react'
import axios from 'axios';
import '../../css/RequestCard.css'

function RequestCard(props) {

    const connectedUser = props.connectedUser;
    const requests = props.requests;
    const setRequests = props.setRequests;

    function handleAccept() {
        let user = {
            UserId: connectedUser.UserId,
            UserName: connectedUser.UserName,
            UserEmail: connectedUser.UserEmail,
            UserPassword: connectedUser.UserPassword,
            UserRole: 'admin',
            UserWantsAdmin: false
        };

        axios.put('http://localhost:51404/api/User', user)
            .then(res => {
            })
            .catch(err => {
                console.log(err)
            });

        deleteRequest()
    }

    function handleReject() {
        let user = {
            UserId: connectedUser.UserId,
            UserName: connectedUser.UserName,
            UserEmail: connectedUser.UserEmail,
            UserPassword: connectedUser.UserPassword,
            UserRole: connectedUser.UserRole,
            UserWantsAdmin: false
        };

        axios.put('http://localhost:51404/api/User', user)
            .then(res => {
            })
            .catch(err => {
                console.log(err)
            });
        
        deleteRequest()
    }

    function deleteRequest() {
        var l = [];
        for(const request of requests) {
            if(request.UserId === connectedUser.UserId)
                continue;
            l.push(request);
        }
        setRequests(l);
    }

    return (
        <div className='card'>
            <div>
                <h3 className='title'>{connectedUser.UserName} wants to be admin</h3>
                <p>User: {connectedUser.UserName}</p>
                <p>Email: {connectedUser.UserEmail}</p>
            </div>
            <div className='buttons-div'>
                <button id='accept' onClick={handleAccept}>Accept</button>
                <button id='reject' onClick={handleReject}>Reject</button>
            </div>
        </div>
    )
}

export default RequestCard
