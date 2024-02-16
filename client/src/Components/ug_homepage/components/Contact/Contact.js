import React from "react";
import { Contact_data } from "./Contact_data";
import { GiMailbox, GiPhone } from "react-icons/gi";

import "./contact.css";

const Contact = () => {
  return (
    <>
      <div id="contact">
        {Contact_data.map((Contact_data, index) => {
          return (
            <div key={index}>
              <div className={Contact_data.contact_sub_contcainer}>
                <h2>{Contact_data.contact_title}</h2>

                <div className={Contact_data.contact_box}>
                    <div className="map">
                      <iframe src={Contact_data.map} frameborder="0"></iframe>
                    </div>
                  <div className={Contact_data.mpa_adresss}>
                    
                      <p>
                        <h1 className={Contact_data.adres}>
                          {Contact_data.adress}
                        </h1>
                        {Contact_data.ad1}
                      </p>
                      {/* <p>{Contact_data.ad2}</p> */}
                      <p>
                        <span>
                          <GiPhone />
                        </span>
                        {Contact_data.mobile}
                      </p>
                      <p>
                        <span>
                          <GiMailbox />
                        </span>
                        {Contact_data.email}
                      </p>
                    
                  </div>

                  <div>
                    <form action="" className="ug_from">
                      <input type="text" className="ug_input" placeholder="FIRST NAME" />
                      <input type="text" className="ug_input" placeholder="LAST NAME" />
                      <input type="text"  className="ug_input" placeholder="Your email address" />
                      <select name="" id="" placeholder="category">
                        <option value="">{Contact_data.category}</option>
                        <option value="">{Contact_data.op1}</option>
                        <option value="">{Contact_data.op2}</option>
                        <option value="">{Contact_data.op3}</option>
                        <option value="">{Contact_data.op4}</option>
                      </select>
                      <textarea placeholder=" Message"></textarea>
                      <input   className="ug_input" type="submit" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Contact;
