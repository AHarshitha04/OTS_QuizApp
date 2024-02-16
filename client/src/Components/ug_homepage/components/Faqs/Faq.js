import React from 'react'
import { useState } from 'react'
import './Faq.css'


const Faq = () => {
    const [selected, setSelected] = useState(null)
    const toggle2 = (i1) => {
        // return i
        if (selected === i1) {
            return setSelected(null)

        }
        setSelected(i1)
    }
    return (
        <div className='UG_faqdiv' >
            <div className="uG_wrapper-3 ug_faq_container">
            
            <div className='UG_faqheading' >
                <h3>FREQUENTLY ASKED QUESTIONS</h3>
          
            </div>
                <div className="UG_accordion2"id='faq'>
                    {sixtoten.map((item, i2) => (
                        <div className="ug_item2" >
                            <div className="ug_faqtitle" onClick={() => toggle2(i2)}>
                                <h2>{item.UG_Qustion}</h2>
                                <span>{selected === i2 ? '-' : '+'}</span>
                            </div>
                            <div  className={selected === i2 ? 'ug_content-show2' : 'ug_content2'}>{item.UG_answer}</div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Faq;
const sixtoten = [
    {
        UG_Qustion: "What information do we need for registration?",
        UG_answer: "Name, contact number, email id, password, country, city."
    },

    {
        UG_Qustion: "Will the money be refunded?",
        UG_answer: "No refund will be given if a student wishes to opt out during the period of subscription. We will try to resolve any technical issues in the payment within 48 hours of credit to our account."
    },
    {
        UG_Qustion: "Do we provide any demo tests?",
        UG_answer: "Yes, we provide the demo test for those who get registered."
    },

    {
        UG_Qustion: "Are there any discount/coupons available for OTS?",
        UG_answer: "Yes, if you are referred by any of our faculty. You can use the same while making the payment."
    },

    {
        UG_Qustion: " I did not get my answer from the above FAQs, whom should I contact?",
        UG_answer: "In case you didn’t get the information, you are looking for, you can contact the eGRADTutor Helpdesk number: +91-7993270532, Email: Info@egradtutor.in."
    },
    {
        UG_Qustion: "What is the mode of registration?",
        UG_answer:"Registration mode will be online."
    },
      {
        UG_Qustion: "What is the mode of payment?",
        UG_answer: "Payment can be done through debit card, credit card, UPI, Net banking."
    },
    {
        UG_Qustion: "What if the money debited and the test is not accessible?",
        UG_answer: "Please contact our web team -info@egradtutor.in they will try to resolve it in 24 hours."
    },
    {
        UG_Qustion: " Do we need to make a payment to get registered?",
        UG_answer: "No. Registration is free of cost, and you need to make payment only when you subscribe to any of our products."
    },
    {
        UG_Qustion: "Who created the test series?",
        UG_answer: "These tests are created by top faculty across India who have 10+Years of experience and by the graduates from IIT/ IISC, IISER."
    },
   

    
]
