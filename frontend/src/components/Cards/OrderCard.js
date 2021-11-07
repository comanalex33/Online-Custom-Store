import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../../css/OrderList.css'
import Popup from '../Popups/Popup'
import ProductOrderCard from './ProductOrderCard'

function OrderCard(props) {

    const order = props.item
    const [popup, setPopup] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Order/${order.id}`)
            .then(res => {
                setProducts(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const productList = products.map((item, _) => (
        <ProductOrderCard item={item} key={item.id} />
    ))

    const handleShowDetails = event => {
        setPopup(true)
    }

    const handleClosePopup = event => {
        setPopup(false)
    }

    return (
        <div className='orderList-card'>
            <div>
                <h3 className='orderList-number'>Order nr#{order.id}</h3>
                <p>Order date: {order.date}</p>
                <p>Address: {order.address}</p>
                <p>Total price: {order.price} lei</p>
            </div>
            <div className='show-details-button'>
                <button id='orderList-show-details' onClick={handleShowDetails}>Show details</button>
            </div>
            <Popup trigger={popup}>
                {productList}
                <div className='popup-close'>
                    <button onClick={handleClosePopup} id='popup-close-button'>Close</button>
                </div>
            </Popup>
        </div>
    )
}

export default OrderCard