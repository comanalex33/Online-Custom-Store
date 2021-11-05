import React, { useState } from "react";
import '../../css/ShoppingCart.css'
import axios from "axios";
import { useEffect } from "react";
import ShoppingCard from "../Cards/ShoppingCard";

function ShoppingCart({connectedUser}){

    const[orders,setOrders]=useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/OrderProduct/${connectedUser.id}`)
            .then(res => {
                setOrders(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },)

    const orderList= orders.map((order, index) => (

        <ShoppingCard order={order} key={index} />
    ))

    return (
        <section className="container">
        <ul className="orders_pr">
            {orderList}
        </ul>


      <div className="checkout">
        <button className="btn">Make order</button>
      </div>
        </section>
    );
}

export default ShoppingCart;
