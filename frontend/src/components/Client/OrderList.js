import axios from 'axios'
import React, { useState, useEffect } from 'react'
import OrderCard from '../Cards/OrderCard'

function OrderList({ connectedUser }) {

    const [orders,setOrders] = useState([])
    let ordersList = []

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Order/getByUser/${connectedUser.id}`)
            .then(res => {
                setOrders(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    ordersList = orders.map((item,_) => (
        <OrderCard item={item} key={item.id} />
    ))

    return (
        <div>
            {ordersList}
        </div>
    )
}

export default OrderList
