import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../../css/DetailsProduct.css'

function ProductOrderCard(props) {

    const item = props.item
    const [product, setProduct] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Product/${item.productId}`)
            .then(res => {
                setProduct(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='product-details-card'>
            <h3 className='product-details-title'>Product</h3>
            <p>Name: {product.name}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <img id='product-details-image' src={product.imageSrc}/>
            <h3 className='product-details-title'>Personalize type</h3>
            {(item.text !== null)?
            <div className='personalized-container'>
            <div className='personalized-type'><p>Text: {item.text}</p></div>
            </div>: null}
            {(item.imageSrc !== null)?
            <div className='personalized-container'>
            <div className='personalized-type'><p>Image:</p></div>
            <img className='product-details-personalized-image' src={item.imageSrc}/>
            </div>: null}
        </div>
    )
}

export default ProductOrderCard
