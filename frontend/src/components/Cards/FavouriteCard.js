import React from 'react'
import axios from 'axios'
import '../../css/Favourites.css'

function FavouriteCard(props) {

    const favourite = props.item
    const products = props.products
    const setProducts = props.setProducts

    const handleRemoveFromFavourites = event => {
        if (window.confirm("Are you sure you want to remove this?")) {
            axios.delete(`http://localhost:5000/api/Favourites/${favourite.id}`)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

            deleteFavourite()
        }
    }

    function deleteFavourite() {
        var l = [];
        for (const product of products) {
            if (product.id === favourite.id)
                continue;
            l.push(product);
        }
        setProducts(l);
    }

    return (
        <div className='favourites-card'>
            <div className='image-container'>
                <img src={favourite.imageSrc} id='favourite-card-image' />
            </div>
            <div className='data-container'>
                <div className='favourite-data-item'><span className='bold'>Name</span>: {favourite.name}</div>
                <div className='favourite-data-item'><span className='bold'>Category</span>: {favourite.category}</div>
                <div className='favourite-data-item'><span className='bold'>Description</span>: {favourite.description}</div>
                <div className='favourite-data-item'><span className='bold'>Price</span>: {favourite.price}</div>
                <button className='remove-favourite' onClick={handleRemoveFromFavourites}>Remove</button>
            </div>
        </div>
    )
}

export default FavouriteCard
