import React, { useState } from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../../css/Order.css'

const Order = props => {
    // const selectedProduct=props.selectedProduct
    // console.log(selectedProduct)
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search); // result: '?query=abc'
        console.log(location.state.selectedProduct); // result: 'some_value'
     }, [location]);
    return (
        // <div>
        //     Personalize with your photo and text
        //     <p>name: {location.state.selectedProduct.name}</p>
        //     <p>description: {location.state.selectedProduct.description}</p>
        // </div>
        <div className="order">
            <div className="details" key={location.state.selectedProduct.id}>
              <div className="big-img">
                <img src={location.state.selectedProduct.imageSrc} alt=""/>
              </div>
              <div className="box">
                <div className="row">
                  <div className="title">{location.state.selectedProduct.name}</div>
                  <span>Pret: {location.state.selectedProduct.price} lei</span>
                </div>
                <div className="order_description">{location.state.selectedProduct.description}</div>
                <div className="text">Personalizeaza cu poza:
                <div className='product-add-image'>
                     <input type='file' id='input-file' /> 
                </div>
                </div>
                <div>
                   Personalizeaza cu text: 
                   <input type="text"></input>
                </div>
              </div>
              <button className="cart">Add to cart</button>
            </div>
      </div>
    )
}

export default Order