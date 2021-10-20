import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Faqs.css'
import AddFaqPopup from '../Popups/AddFaqPopup';

function Faqs({connectedUser}) {

    const [faqs, setFaqs] = useState([]);
    const [buttonAdd, setButtonAdd] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:51404/api/Faqs')
        .then(res => {
          setFaqs(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      }, [])

    const faqList = faqs.map((item, index) => (
        <>
            <li>{item.FaqQuestion}</li>
            <ul>
                <li>{item.FaqAnswer}</li>
            </ul>
        </>
    ))

    const handlePopup = event => {
        setButtonAdd(true)
    }

    return (
        <div>
            <ul>
                {faqList}
            </ul>
            {(connectedUser.UserRole === 'admin') ? <button id='fixed-button' onClick={() => setButtonAdd(true)}>Add Faq</button> : null }
            <AddFaqPopup trigger={buttonAdd} setTrigger={setButtonAdd}>
                <h2>Add FAQ</h2>
                <div className='input-fields'>
                <input type='text' placeholder='Question' className='input-text'></input>
                <input type='text' placeholder='Answer' className='input-text'></input>
                </div>
                <button className='add-faq'>Add</button>
            </AddFaqPopup>
        </div>
    )
}

export default Faqs
