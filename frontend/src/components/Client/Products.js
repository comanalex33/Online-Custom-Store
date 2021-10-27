import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import product_card from '../Product/ProductData'
import '../../css/Products.css'


function Products () {

const history = useHistory()

const handlePersonalizeButton = () => {
    history.push('/dashboard/order');
  }

    //const main_content = () => {
    console.log(product_card);
    const listItems = product_card.map((item) => 
        <div className="card" key={item.id}>

            <div className="card_img">
                <img src={item.thumb} alt=""/>
            </div>
            <div className="card_header">
                <h2>{item.product_name}</h2>
                <p>{item.description}</p>
                <p className="price">{item.price}<span>{item.currency}</span></p>
                <div className="btn" onClick={handlePersonalizeButton}>Personalize
                </div>
                <div className="btn">Add to favourites</div>
            </div>
        </div>

    );


    return(
        <div className="main_content">
            {listItems}
        </div>
    )
}


export default Products;