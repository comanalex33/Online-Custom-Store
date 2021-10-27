import React, { useState } from 'react'

const Order = () => {

    const [message, setMessage] = useState(false)

    const handleMessage = event => {
        setTimeout(() => {
            setMessage(false)
        }, 3000);
        setMessage(true)
    }

    return (
        <div>
            Personalize with your photo and text
        </div>
    )
}

export default Order
