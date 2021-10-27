import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../../css/RequestCard.css'
import RequestCard from '../Cards/RequestCard'

function Requests() {

    const [requests, setRequests] = useState([]);
    let requestList = []

    useEffect(() => {
        axios.get('http://localhost:5000/api/User')
            .then(res => {
                let l = [];
                for (const request of res.data)
                    if (request.wantsAdmin === true && request.role === 'client') {
                        l.push(request)
                    }
                setRequests(l);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    requestList = requests.map((item, _) => (
        (item.wantsAdmin) ? <RequestCard connectedUser={item} requests={requests} setRequests={setRequests} key={item.id} /> : null
    ))

    if(requests.length === 0)
         requestList = <div className='container'><div className='no-requests'><h1>No requests</h1></div></div>

    return (
        <div className='max-height'>
            {requestList}
        </div>
    )
}

export default Requests
