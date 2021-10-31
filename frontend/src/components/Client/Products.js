import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios'
import '../../css/Products.css'


function Products({connectedUser}) {

    
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

        //console.log(product)
        if(product!==null)
           history.push({
            pathname: '/dashboard/order',
            search: '?query=abc',
            state: { selectedProduct: product }
        });
    }

    const handleDeleteButton = id => {
        console.log(id)
            axios.delete('http://localhost:5000/api/Product/',{ params: { id: id } })
            .then((response) => {
                console.log(response);
            })
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
            {(connectedUser.role !== 'admin') ?
            <div className="btn" onClick={() => handlePersonalizeButton(item)}>Personalize
            </div> : <div className="btn" onClick={() => handleDeleteButton(item.id)}>Delete
            </div>}
            {(connectedUser.role !== 'admin') ?
            <div className="btn">Add to favourites</div>:null}
        </div>
    </div>
    ))


    return (
        <div>
             {(connectedUser.role === 'admin') ? 
                <button className="add_product">Add product</button>: null}
            <div className="main_content">
                {productsList}   
            </div>
        </div>
    )
}


export default Products;
