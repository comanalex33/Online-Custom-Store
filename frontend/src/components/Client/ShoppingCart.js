import React, { useState } from "react";
import '../../css/ShoppingCart.css'
import axios from "axios";
import { useEffect } from "react";
import ShoppingCard from "../Cards/ShoppingCard";
import { useHistory } from "react-router";

function ShoppingCart({connectedUser}){

    const[finalOrders,setFinalOrder]=useState([]);
    const[address,setAddress]=useState('');
    const[orders,setOrders]=useState([]);
    const [productsId,setProductsId]=useState([]);
    
    let orderList=[];

    useEffect(() => {
        axios.get(`http://localhost:5000/api/OrderProduct/${connectedUser.id}`)
            .then(res => {
                setOrders(res.data);
               
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    },[]);

    

    useEffect(()=>{
      for(let i=0;i<orders.length;i++)
      {
        productsId.push(orders[i].productId);
        setProductsId(productsId);
        console.log(productsId);
      }
    },[orders,productsId]);
    console.log(productsId);

    const history=useHistory();

    const handleMakeOrder=event=>{
      let finalOrder={
        productId: productsId,
        address:address
      }
      console.log(finalOrder);

      axios.post('http://localhost:5000/api/Order', finalOrder)
                            .then(res => {
                                console.log(res);
                                alert("The order was succesfully added!");
                            })
                            .catch(err => {
                                console.log(err)
                            });
      finalOrders.push(finalOrder);
      setFinalOrder(finalOrders)
      deleteItems();
      history.push('/dashboard/products');
    }

    function deleteItems(){
      for(let i=0;i<productsId.length;i++){
        axios.get(`http://localhost:5000/api/Order/${productsId[i]}`)
        .then((response) => {
          console.log(response);
      })
        .catch(err => {
          console.log(err);
        })
      }
    }
  

    const handleAddressChange = event =>{
      setAddress(event.target.value);
    }

    orderList= orders.map((order, index) => (

      <ShoppingCard order={order} key={index} />
    ))

    
    return (
        <section className="container">
        <ul className="orders_pr">
            {orderList}
        </ul>
        {(orderList.length!==0) ?
        <div>
        <div className="address">
          <input type="text" value={address} placeholder="Adress" onChange={handleAddressChange}></input>
          </div>
       
        <div className="checkout">
          <button className="btn" onClick={handleMakeOrder}>Make order</button>
        </div>
        </div>
      : null}
        </section>
    );
}

export default ShoppingCart;
