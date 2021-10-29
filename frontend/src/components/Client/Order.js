import React, { useState } from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
        <div>
            Personalize with your photo and text
            <p>name: {location.state.selectedProduct.name}</p>
            <p>description: {location.state.selectedProduct.description}</p>
        </div>
    )
}

export default Order