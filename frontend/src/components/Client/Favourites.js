import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FavouriteCard from '../Cards/FavouriteCard'

function Favourites({connectedUser}) {

    const [products, setProducts] = useState([])
    const [render, setRender] = useState(false)

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

    const favList = products.map((item, index) => (
        <FavouriteCard item={item} key={item.id} />
    ))

    return (
        <div>
            {favList}
        </div>
    )
}

export default Favourites
