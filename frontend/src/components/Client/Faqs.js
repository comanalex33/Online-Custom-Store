import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Faqs.css'
import AddFaqPopup from '../Popups/AddFaqPopup';
import Popup from '../Popups/Popup';
import FaqCard from '../Cards/FaqCard';

function Faqs({ connectedUser }) {

    const [popup, setPopup] = useState(false)
    const [selectedFaq, setSelectedFaq] = useState(0)
    const [faqs, setFaqs] = useState([]);
    const [buttonAdd, setButtonAdd] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/Faqs')
            .then(res => {
                setFaqs(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [question])

    const handleQuestionChange = event => {
        setQuestion(event.target.value)
    }

    const handleAnswerChange = event => {
        setAnswer(event.target.value)
    }

    const handleClose = event => {
        setButtonAdd(false)
        setAnswer('')
        setQuestion('')
    }

    const handleAddFaq = event => {
        let faq = {
            question: question,
            answer: answer
        }

        axios.post('http://localhost:5000/api/Faqs', faq)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            });

        faqs.push(faq)
        setFaqs(faqs)

        setTimeout(() => {
            setButtonAdd(false)
            setAnswer('')
            setQuestion('')
        }, 300)
    }

    const handleDeleteFaq = event => {
        axios.delete(`http://localhost:5000/api/Faqs/${selectedFaq}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        deleteFaq()
        setPopup(false)
    }

    function deleteFaq() {
        var l = [];
        for(const f of faqs) {
            if(f.id === selectedFaq)
                continue;
            l.push(f);
        }
        setFaqs(l);
    }

    const faqList = faqs.map((item, index) => (
        <FaqCard connectedUser={connectedUser} setSelectedFaq={setSelectedFaq} setPopup={setPopup} faq={item} faqs={faqs} setFaqs={setFaqs} key={item.id} />
    ))

    return (
        <div className='faq-page'>
            <div>
                {faqList}
                {(connectedUser.role === 'admin') ? <button id='faq-fixed-button' onClick={() => setButtonAdd(true)}>Add Faq</button> : null}
                <AddFaqPopup trigger={buttonAdd} setTrigger={setButtonAdd} faqs={faqs} setFaqs={setFaqs}>
                    <h2 className='add-faq-title'>Add FAQ</h2>
                    <div className='input-fields'>
                        <button className='close-btn' onClick={handleClose}>Close</button>
                        <input type='text' placeholder='Question' className='input-text' value={question} onChange={handleQuestionChange}></input>
                        <input type='text' placeholder='Answer' className='input-text' value={answer} onChange={handleAnswerChange}></input>
                    </div>
                    <button className='add-faq' onClick={handleAddFaq}>Add</button>
                </AddFaqPopup>
            </div>
            <Popup trigger={popup}>
                <h2 id='title-accept-delete'>Are you sure you want to delete this faq?</h2>
                <div>
                    <button id='button-accept' onClick={handleDeleteFaq}>Yes</button>
                    <button id='button-reject' onClick={() => setPopup(false)}>No</button>
                </div>
            </Popup>
        </div>

    )
}

export default Faqs
