import axios from 'axios';
import React, { useState } from 'react'
import {useEffect} from "react"
import { useHistory } from 'react-router';
import '../../css/ShoppingCart.css'

function ShoppingCard(props) {

    const order = props.order;
    const[product,setProduct]=useState('');
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/Product/${order.productId}`)
            .then(res => {
                setProduct(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    
  
    return (
      <div className="row">
      <div className="col left">
        <div className="thumbnail">
          <a href="#">
            <img src={product.imageSrc} alt="" />
          </a>
        </div>
        <div className="detail">
          <div className="name">
            <a href="#">{product.name}</a>
          </div>
          <div className="description">Description: {product.description}</div>
          <div className="price">{product.price} lei</div>
          <div className="name">Text personalizat: {order.text} </div>
          <div className="name">Poza personalizata: 
            <img src={order.imageSrc} alt="" height="100px" width="100px"/>
          </div>
        </div>
      </div>

      <div className="col right">

        <div className="remove">
          <svg
           
            version="1.1"
            className="close"
            x="0px"
            y="0px"
            viewBox="0 0 60 60"
            enableBackground="new 0 0 60 60"
          >
            <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
          </svg>
        </div>
      </div>
    </div>
    )
}

export default ShoppingCard
