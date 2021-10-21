import React, { useState } from 'react'
import '../../css/Popup.css'

function AddFaqPopup(props) {

    // const handleClose = event => {
    //     props.setTrigger(false)
    //     props.setFaqs(props.faqs)
    // }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                {/* <button className='close-btn' onClick={handleClose}>Close</button> */}
                {props.children}
            </div>
        </div>
    ) : "";
}

export default AddFaqPopup
