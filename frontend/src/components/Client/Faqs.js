import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Faqs.css'
import AddFaqPopup from '../Popups/AddFaqPopup';
import FaqCard from '../Cards/FaqCard';

function Faqs({connectedUser}) {

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
            FaqQuestion: question,
            FaqAnswer: answer
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
        },100)
    }

    const faqList = faqs.map((item, index) => (
        // <div key={item.FaqId}>
        //     <li>{item.FaqQuestion}</li>
        //     <ul>
        //         <li>{item.FaqAnswer}</li>
        //     </ul>
        // </div>
        <FaqCard position={(index % 2 === 0) ? 'flex-start' : 'flex-end'} FaqQuestion={item.FaqQuestion} FaqAnswer={item.FaqAnswer} key={item.FaqId}/>
    ))

    return (
        <div>
            {faqList}
            {(connectedUser.Role === 'admin') ? <button id='fixed-button' onClick={() => setButtonAdd(true)}>Add Faq</button> : null }
            <AddFaqPopup trigger={buttonAdd} setTrigger={setButtonAdd} faqs={faqs} setFaqs={setFaqs}>
                <h2>Add FAQ</h2>
                <div className='input-fields'>
                <button className='close-btn' onClick={handleClose}>Close</button>
                <input type='text' placeholder='Question' className='input-text' value={question} onChange={handleQuestionChange}></input>
                <input type='text' placeholder='Answer' className='input-text' value={answer} onChange={handleAnswerChange}></input>
                </div>
                <button className='add-faq' onClick={handleAddFaq}>Add</button>
            </AddFaqPopup>
        </div>
    )
}

export default Faqs
