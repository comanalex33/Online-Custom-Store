import React from 'react'
import axios from 'axios';
import '../../css/Faqs.css'

function FaqCard(props) {

    const connectedUser = props.connectedUser
    const faq = props.faq
    const faqs = props.faqs
    const setFaqs = props.setFaqs
    const setSelectedFaq = props.setSelectedFaq
    const setPopup = props.setPopup

    const handleDeleteFaq = event => {
        // axios.delete(`http://localhost:5000/api/Faqs/${faq.id}`)
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        // deleteFaq()
        setPopup(true)
        setSelectedFaq(faq.id)
    }

    function deleteFaq() {
        var l = [];
        for(const f of faqs) {
            if(f.id === faq.id)
                continue;
            l.push(f);
        }
        setFaqs(l);
    }

    return (
        <div className=' faq-card-container'>
            <div className='faq-card'>
                <div className='faq-data'>
                    <h3>{faq.question}</h3>
                    <div className='faq-answer-text'>
                        {faq.answer}
                    </div>
                </div>
                <div className='faq-delete-container'>
                    {(connectedUser.role === 'admin')?
                    <button id='faq-delete-button' onClick={handleDeleteFaq}>Delete</button>:null}
                </div>
            </div>
        </div>

    )
}

export default FaqCard
