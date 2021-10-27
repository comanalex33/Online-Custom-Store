import React from 'react'
import '../../css/Faqs.css'

function FaqCard(props) {

    const position = props.position
    const question = props.FaqQuestion
    const answer = props.FaqAnswer

    return (
        <div className={position + ' card-container'}>
            <div className='card'>
                <h3>{question}</h3>
                <hr></hr>
                <div className='answer-text'>
                    {answer}
                </div>
            </div>
        </div>

    )
}

export default FaqCard
