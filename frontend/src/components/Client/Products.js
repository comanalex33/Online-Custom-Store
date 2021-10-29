import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios'
import '../../css/Products.css'


function Products() {

    
    const[products, setProducts]=useState([]);
    const[name,setName]=useState('');
    const[description, setDescription]=useState('');
    const[price,setPrice]=useState(0);
    const[image,setImage]=useState('');
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/Product')
        .then(res => {
            setProducts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    )

    

    const history=useHistory();
    function handlePersonalizeButton(product){

        console.log(product)
        if(product!==null)
           // history.push('/dashboard/order', {selectedProduct: product});
           history.push({
            pathname: '/dashboard/order',
            search: '?query=abc',
            state: { selectedProduct: product }
        });
    }

    const productsList= products.map((item) => (
        <div className="card" key={item.id}>
        <div className="card_img">
            <img src={item.imageSrc} alt="" />
        </div>
        <div className="card_header">
            <h2 className='product-item-title'>{item.name}</h2>
            <div className='product-description'>{item.description}</div>
            <p className="price">{item.price}<span>{'lei'}</span></p>
            <div className="btn" onClick={() => handlePersonalizeButton(item)}>Personalize
            </div>
            <div className="btn">Add to favourites</div>
        </div>
    </div>
    ))


    return (
        <div className="main_content">
            {productsList}
        </div>
    )
}


export default Products;
