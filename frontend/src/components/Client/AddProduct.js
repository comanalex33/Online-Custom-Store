import React,{ useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import '../../css/AddProduct.css'

function AddProduct() {
    
    
    const[products, setProducts]=useState([]);
    const[name,setName]=useState('');
    const[category,setCategory]=useState('');
    const[description, setDescription]=useState('');
    const[price,setPrice]=useState('');
    const[image,setImage]=useState(null);
    const[selectedFile,setSelected]=useState(null);
   
    const history=useHistory();


    const handleSubmitButton = event => {

        const formData= new FormData();
        formData.append('name', name)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('imageFile', selectedFile)
    
        axios.post('http://localhost:5000/api/Product', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            });

        products.push(formData)
        setProducts(products)
        
        history.push('/dashboard/products');
    }
    const handleNameChange = event => {
        setName(event.target.value)
    }

    const handleCategoryChange = event => {
        setCategory(event.target.value)
    }

    const handleDescriptionChange = event => {
        setDescription(event.target.value)
    }

    const handlePriceChange = event => {
        setPrice(event.target.value)
    }

    const handleImageChange = event => {
        setSelected(event.target.files[0]); 
    }

    return (
        <div className="Container_add">
            <div className="Form">
                <div className="center">
                    <input className="center_content input_text" type='text' placeholder='Name'  value={name}  onChange={handleNameChange}></input>
                </div>
                <div className="center">
                    <input className="center_content input_text" type='text' placeholder='Category'  value={category} onChange={handleCategoryChange}></input>  
                </div>
                <div className="center">
                    <input className="center_content input_text" type='text' placeholder='Description'  value={description} onChange={handleDescriptionChange}></input>
                </div>
                <div className="center">
                    <input className="center_content input_text" type='number' placeholder='Price'  value={price} onChange={handlePriceChange}></input>
                </div>
                <div className="center">
                    <input className="center_content input_text" type='file' placeholder='Answer' className='image' value={image} onChange={handleImageChange}></input>
                </div>
                <div>
                    <button className="button_submit" onClick={handleSubmitButton}>Submit</button>
                </div>
           </div>    
        </div>
       
    );
}

export default AddProduct;
