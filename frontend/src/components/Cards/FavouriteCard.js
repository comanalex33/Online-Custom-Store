import React from 'react'
import '../../css/Favourites.css'

function FavouriteCard(props) {

    const favourite = props.item

    return (
        <div className='favourites-card'>
            <div className='image-container'>
                <img src={favourite.imageSrc} id='favourite-card-image' />
            </div>
            <div className='data-container'>
                <p>Name: {favourite.name}</p>
                <p>Category: {favourite.category}</p>
                <p>Description: {favourite.description}</p>
                <p>Price: {favourite.price}</p>
                <button className='remove-favourite'>Remove</button>
            </div>
        </div>
    )
}

export default FavouriteCard
