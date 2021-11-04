import React, { useState } from 'react'
import { useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../css/Order.css'

function Order ({connectedUser}) {
    
    const[text,setText]=useState('');
    const[selectedFile,setSelected]=useState(null);
    const[order,setOrder]=useState([]);
    const[image,setImage]=useState(null);
    const location=useLocation();

    useEffect(() => {
        console.log(location.pathname); 
        console.log(location.search); 
        console.log(location.state.selectedProduct); 
     }, [location]);

    const selectedId=location.state.selectedProduct.id;
    const userId= connectedUser.id;
    const handleAddToCart = event =>{
      const formData= new FormData();
      formData.append('userId', connectedUser.id)
      formData.append('productId', selectedId)
      formData.append('text', text)
      formData.append('imageFile', selectedFile)

      axios.post('http://localhost:5000/api/OrderProduct', formData)
      .then(res => {
          console.log(res);
          alert("The product was succesfully added to cart!");
      })
      .catch(err => {
          console.log(err)
      });

      order.push(formData);
      setOrder(order);
    }

    const handleTextChange = event => {
      setText(event.target.value)
    }

    const handleImageChange = event => {
      setSelected(event.target.files[0]); 
    }

  
    return (
        
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
                     <input type='file' value={image} onChange={handleImageChange}/> 
                </div>
                </div>
                <div>
                   Personalizeaza cu text: 
                   <input type="text" value={text} onChange={handleTextChange}></input>
                </div>
              </div>
              <button className="cart" onClick={handleAddToCart}>Add to cart</button>
            </div>
      </div>
    )
}

export default Order