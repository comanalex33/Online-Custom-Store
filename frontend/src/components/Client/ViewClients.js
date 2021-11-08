import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router";
import '../../css/ViewClients.css'

function ViewClients() {
    const [clients,setClients]=useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/User')
            .then(res => {
                let l = [];
                for (const client of res.data)
                    if (client.role === 'client') {
                        l.push(client)
                    }
                setClients(l);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const history=useHistory();
    const handleBackButton = () =>
    {
        history.push('/dashboard/profile');
    }

    const clientsList = clients.map((item)=>
        <div className="client">
            <div>
                <img className="client_image" src={item.imageSrc} />
            </div>
            <div className="client_detail">Username: {item.name}</div>
            <div className="client_detail">Email: {item.email}</div>
           
        </div>
    );
    return (
        <div>
            <div className="button_back">
                <button onClick={handleBackButton}>Back</button>
            </div>
            <div className="container_client">
                {clientsList}
            </div>
            
        </div>
    )
}

export default ViewClients
