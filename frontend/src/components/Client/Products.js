import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios'
import '../../css/Products.css'


function Products({connectedUser}) {

    
    const[products, setProducts]=useState([]);
    const[name,setName]=useState('');
    const[category,setCategory]=useState('');
    const[description, setDescription]=useState('');
    const[price,setPrice]=useState('');
    const[image,setImage]=useState('');
    const [popup, setPopup] = useState(false);
    const [buttonAdd, setButtonAdd] = useState(false);
    
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
        if(window.confirm("Are you sure you want to delete?"))
        {
            console.log(id)
            axios.delete('http://localhost:5000/api/Product/',{ params: { id: id } })
            .then((response) => {
                console.log(response);
            })
        }
    }

    const handleAddToFavourites = id => {
        let favourite = {
            userId: connectedUser.id,
            productId: id
        }
        axios.post('http://localhost:5000/api/Favourites', favourite)
            .then(res => {
                alert("Produs adaugat la favorite")
            })
            .catch(err => {
                if(err.response.status === 400)
                    alert("Produsul a fost adaugat deja la favorite!")
            });
    }

    const handleAddButton = event => {
        history.push('/dashboard/add')

    }
    const handleClose = event => {
        setButtonAdd(false)
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
            <div className="btn" onClick={() => handlePersonalizeButton(item)}>Order
            </div> : <div className="btn" onClick={() => handleDeleteButton(item.id)}>Delete
            </div>}
            {(connectedUser.role !== 'admin') ?
            <div className="btn" onClick={() => handleAddToFavourites(item.id)}>Add to favourites</div>:null}
        </div>
    </div>
    ))


    return (
        <div>
             {(connectedUser.role === 'admin') ? 
                <button className="add_product" onClick={handleAddButton}>Add product</button>: null}
                 {/* <AddProductPopup trigger={buttonAdd} setTrigger={setButtonAdd} products={products} setProducts={setProducts}>
                    <h2 className='add-faq-title'>Add product</h2>
                    <div className='input-fields'>
                        <button className='close-btn' onClick={handleClose}>Close</button>
                        <input type='text' placeholder='Name' className='input-text' value={name} ></input>
                        <input type='text' placeholder='Category' className='input-text' value={category} ></input>
                        <input type='text' placeholder='Description' className='input-text' value={description} ></input>
                        <input type='number' placeholder='Price' className='input-text' value={price} ></input>
                        <input type='file' placeholder='Answer' className='image' value={image} ></input>
                    </div>
                    <button className='add-faq' onClick={handleAddButton}>Add</button>
                </AddProductPopup> */}
               
            <div className="main_content">
                {productsList}   
            </div>
        </div>
    )
}


export default Products;
