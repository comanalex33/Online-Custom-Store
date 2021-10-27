import React from 'react'
import axios from 'axios';
import '../../css/RequestCard.css'

function RequestCard(props) {

    const connectedUser = props.connectedUser;
    const requests = props.requests;
    const setRequests = props.setRequests;

    const updateUser = (formData) => {
        axios.put('http://localhost:5000/api/User', formData)
            .then(console.log('Updated'))
            .catch(error => {
                console.log(error)
            })
    }

    function handleAccept() {
        const formData = new FormData()
        formData.append('id', connectedUser.id)
        formData.append('name', connectedUser.name)
        formData.append('email', connectedUser.email)
        formData.append('password', connectedUser.password)
        formData.append('role', 'admin')
        formData.append('wantsAdmin', false)
        formData.append('imageName', (connectedUser.imageName == null)?'':connectedUser.imageName)
        formData.append('imageFile', null)
        formData.append('updateImage', false)

        updateUser(formData)

        deleteRequest()
    }

    function handleReject() {
        const formData = new FormData()
        formData.append('id', connectedUser.id)
        formData.append('name', connectedUser.name)
        formData.append('email', connectedUser.email)
        formData.append('password', connectedUser.password)
        formData.append('role', 'client')
        formData.append('wantsAdmin', false)
        formData.append('imageName', (connectedUser.imageName == null)?'':connectedUser.imageName)
        formData.append('imageFile', null)
        formData.append('updateImage', false)

        updateUser(formData)
        
        deleteRequest()
    }

    function deleteRequest() {
        var l = [];
        for(const request of requests) {
            if(request.id === connectedUser.id)
                continue;
            l.push(request);
        }
        setRequests(l);
    }

    return (
        <div className='card'>
            <div>
                <h3 className='title'>{connectedUser.name} wants to be admin</h3>
                <p>User: {connectedUser.name}</p>
                <p>Email: {connectedUser.email}</p>
            </div>
            <div className='buttons-div'>
                <button id='accept' onClick={handleAccept}>Accept</button>
                <button id='reject' onClick={handleReject}>Reject</button>
            </div>
        </div>
    )
}

export default RequestCard
