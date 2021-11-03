import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FavouriteCard from '../Cards/FavouriteCard'

function Favourites({connectedUser}) {

    const [products, setProducts] = useState([])
    const [render, setRender] = useState(false)
    let favList = []

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Favourites/${connectedUser.id}`)
            .then(res => {
                setProducts(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [render])

    favList = products.map((item, index) => (
        <FavouriteCard item={item} products={products} setProducts={setProducts} key={item.id} />
    ))

    if(products.length === 0)
         favList = <div className='requests-container'><div className='no-requests'><h1>No favourite products</h1></div></div>

    return (
        <div className='max-height'>
            {favList}
        </div>
    )
}

export default Favourites
