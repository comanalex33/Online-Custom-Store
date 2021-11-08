import React, { useState } from "react";
import '../../css/ShoppingCart.css'
import axios from "axios";
import { useEffect } from "react";
import ShoppingCard from "../Cards/ShoppingCard";
import { useHistory } from "react-router";
import Popup from "../Popups/Popup";


function ShoppingCart({connectedUser}){

    const[finalOrders,setFinalOrder]=useState([]);
    const[address,setAddress]=useState('');
    const[orders,setOrders]=useState([]);
    const [productsId,setProductsId]=useState([]);
    const [popup, setPopup] = useState(false)
    
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
        productsId.push(orders[i].id);
        setProductsId(productsId);
        console.log(productsId);
      }
    },[orders,productsId]);

    console.log(productsId);

    const history=useHistory();

  
    const handleMakeOrder=event=>{
      let finalOrder={
        userId: connectedUser.id,
        productId: productsId,
        address: address
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
      setFinalOrder(finalOrders);
      setPopup(false);
      history.push('/dashboard/products')
      
    }

    
    const handleAddressChange = event =>{
      setAddress(event.target.value);
    }

    const handleClose = event => {
      setPopup(false)
     setAddress('')
    }

    orderList= orders.map((order, index) => (
      <ShoppingCard order={order} key={index} orders={orders} setOrders={setOrders}/>
    ))


    return (
        <section className="container">
        <ul className="orders_pr">
            {orderList}
        </ul>
        {(orderList.length!==0) ?
         <div className="checkout">
          <button className="btn"  onClick={() => setPopup(true)}>Make order</button>
         </div> : <div className="empty_cart">No item </div>}
        <Popup trigger={popup}>
            <h2 className='add-faq-title'>Add delivery address</h2>
            <div>
            <div className="address">
              <input type="text" className="address" value={address} placeholder="Address" onChange={handleAddressChange}></input>
              </div>
              <button className='make_order' onClick={handleMakeOrder}>Make order</button>
            </div>
            <button className='close-btn' onClick={handleClose}>Close</button>
        </Popup>
        </section>
    );
}

export default ShoppingCart;
