import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from './egradtutor_logo.png'
import logoo from './browser-removebg-preview.png'
import { HashLink } from "react-router-hash-link"

import './styles/Landing_Page_CSS/Egate.css'
import Exam_Explore from '../components/ug_homepage/components/ExploreExam/Exam_Explore';
import { element } from 'prop-types';
import { Pg_exploreExam } from '../components/PG/PG_homePage/Pg_Explor_Exam/Pg_exploreExam';
import './Landingpage-footer.css'


export const Egate = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* This is the LANDING PAGE of our web site */}

      {/* This perticular div was responsible for all the divs in this landing page. If you want to change the styles for all the landing page then you can use this classname. This style will get effect for all the divs in the landing page */}
      <div className='landingEgate_page'>
        {/* This perticular div was responsible for "logo image tag" and "egradtutor publication anchor tag". If you want changes in these both tags then you can use this div classname */}
        <div className='Egate_logo_with_Link'>
          <div className='Egate_landing_header-e6578i'>
            {/* This perticular div was responsible only for the "logo image tag" */}
            <div className='Egate_logo_hjurnfh'>
              <img src={logo} alt="" />
            </div>
            {/* This perticular div was responsible only for the "egradtutor publication anchor tag" */}
            <div className='Publications'>
              <a style={{ color: '#000' }} href="/">eGRADTutor Publications</a>
            </div>
          </div>
        </div>

        {/* This perticular section will effect with about "logo image tag" and "egradtutor heading tag" and "paragraph tag". If you change any styles by using this classname it will effect for all these tags  */}
        <section className='EGATE_eLanding_Container'>
          <div className="Egate_landing">
            <div className='EGATE_landingE'>
              {/* This perticular div was responsible only for about "logo image tag" */}
              <div className='Egate_loge_landing'>
                <img src={logoo} alt="" />
              </div>
              {/* This perticular div was responsible only for "heading tag" and for "paragraph tag" */}
              <div className='Egate_landiing_ojnkl'>
                <h2>Welcome to eGRADTutor</h2>
                {/* <p>eGRADTutor is an Edtech firm started with a vision to blend the boundaries in education and take best-in-class courses and teachers virtually to every corner of the country. Our courses are developed by the alumni of IIT/IISc with an intent to enhance the student's abilities to face some of the toughest exams of the country. Our offerings not just provide a deeper understanding of the subjects to the students, but they also make them exam ready.</p> */}
                <p>...tutors by grads from IIT's/IISc</p>
              </div>
            </div>
          </div>
        </section>


{/* This perticular section was responsible for all the three boxes of UG, PG and MBA courses  */}
        <section className='Egate_eLanding_Container Egate_landing'>
          <div className="EGATE_eCordsLanding ">
            {/* This perticular div was responsible for the single box of UG Course */}
            <div className='Ug_egatePAge-pg'>

              <div>
                {/* We are using this list to list out all the courses which are present UG */}
                <ul className='EGATE_elandUl'>
                  {/* Here we have used this link tag. So that if we click on the UG button then it will route to the UG Home page  */}
                  <Link className='EGATE_elanLink' to={'/home'} onClick={() => window.scrollTo(0, 0)}>
                    <h3 className='Pg_buttonn'><span class="text">UG COURSES</span> </h3>
                  </Link>
                  {/* These are the separate courses which are there in UG and we have used the link tag here this perticular link will route to that perticular exam pages */}
                  <li><Link to="/iitjeeExam">IIT-JEE <span> (Mains & Advanced) </span> </Link></li>
                  <li><Link to={'/NeetExam'}>NEET</Link></li>
                  <li><Link to={'/bitsatexam'}>BITSAT</Link></li>
                  <li><Link to={"/viteeeexam"}>VITEEE</Link></li>
                  <li><HashLink to='/home#exam' element={<Exam_Explore />}>&OTHER ENTRANCE EXAMS</HashLink></li>
                </ul>
              </div>
            </div>

            {/* This perticular div was responsible for the single box of PG Course */}
            <div className='Ug_egatePAge-pg '>
              {/* We are using this list to list out all the courses which are present PG */}
              <ul className='EGATE_elandUl'>
                {/* Here we have used this link tag. So that if we click on the PG button then it will route to the PG Home page  */}
                <Link className='EGATE_elanLink' to={"/PgHome"} onClick={() => window.scrollTo(0, 0)}>
                  <h3 className='Pg_buttonn'><span class="text">PG COURSES</span> </h3>
                </Link>
                {/* These are the separate courses which are there in PG and we have used the link tag here this perticular link will route to that perticular exam pages */}
                <li><Link to={'/pggateexam'}>GATE</Link></li>
                <li><Link to={"/pgiitjamexam"} >IIT-JAM</Link></li>
                <li><Link to={'/pgEse_exam'} >ESE</Link></li>
                <li><Link to={"/isro_examPage"} >ISRO</Link></li>
                <li><HashLink to={'/PgHome#Exams'} element={<Pg_exploreExam />} >&OTHER ENTRANCE EXAMS</HashLink></li>
              </ul>
            </div>

            {/* This perticular div was responsible for the single box of MBA Course */}
            {/* <div className='Ug_egatePAge-pg'> */}
              {/* Here we have used this link tag. So that if we click on the MBA button then it will route to the MBA Home page  */}
              {/* <Link className='EGATE_elanLink' to={"/MbaHome"}> */}
                {/* We are using this list to list out all the courses which are present in MBA */}
                {/* <ul className='EGATE_elandUl'>
                  <h3 className='Pg_buttonn'><span class="text">MBA</span> </h3>
                  <li><Link >GRE</Link></li>
                  <li><Link >GMAT</Link></li>
                  <li><Link >CAT</Link></li>
                  <li><Link >XAT</Link></li>
                  <li><Link >&OTHER ENTRANCE EXAMS</Link></li>
                </ul>
              </Link>
            </div> */}

            {/* <div className='Ug_egatePAge-pg'>
          <Link  className='EGATE_elanLink'>
            <ul className='EGATE_elandUl'>
              <h3>CA </h3>
              <li><Link >ACCOUNTING</Link></li>
              <li><Link >MERCANTILE LAWS</Link></li>
              <li><Link >GENERAL ECONOMICS</Link></li>
              <li><Link >QUANTITATIVE APTITUDE</Link></li>
              <li><Link >&OTHER ENTRANCE EXAMS</Link></li>
            </ul>
          </Link>
          </div> */}

          </div>
        </section>



    <div className='landingpage_footer'>
      <div className='landingpage_footer_icons'>
      <i className='fa-brands fa-facebook icon'></i>
      <i className='fa-brands fa-instagram icon'></i>
      <i className='fa-brands fa-linkedin icon'></i>
      <i className='fa-brands fa-youtube icon'></i>
      </div>
      <div className=' footer-linkss' style={{textAlign: 'center',borderTop: '1px solid #fff', paddingTop: '10px', paddingBottom: '10px', color: '#fff'}}> <p style={{margin: '0 auto'}}>Copyright © 2023 eGradTutor All rights reserved</p>
        </div>
    </div>
      </div>
    </>
  )
}
