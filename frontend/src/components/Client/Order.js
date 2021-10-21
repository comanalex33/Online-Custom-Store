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
            {(message) ? <div>Message</div> : null}
            Order
            <button onClick={handleMessage}>Click</button>
        </div>
    )
}

export default Order
