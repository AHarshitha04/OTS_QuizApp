import React from 'react'
import { FooterData } from './FooterData'
import './Footer.css'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='footer-container footerBg'>
        <footer className='footer'>
            {FooterData.map((footerItem,footerIndex) => {
                return(
                    <div key={footerIndex} className={footerItem.footerCLass}>
                        <h4 className={footerItem.footerCs}>{footerItem.fotterTitles}</h4>
                        <p>{footerItem.text}</p>

                        <ul>
                        <a href={footerItem.PrivacyPolicy} >
                         <li>{footerItem.home}</li>
                        </a>

                        <a href={footerItem.TermsAndConditions}>
                          <li>{footerItem.about}</li>
                          
                        </a>
                        
                        <a href={footerItem.RefundPolicy}>
                         <li>{footerItem.career}{footerItem.icon}
                        
                         </li> 
                         </a>
                          
                        </ul>
                        
                        <div className='icontsFooter'>
                         <i id='footerIcons' className={footerItem.fb}></i>
                         <i id='footerIcons' className={footerItem.insta}></i>
                         <i id='footerIcons' className={footerItem.linkedin}></i>
                         <i id='footerIcons' className={footerItem.youtube}></i>
                         </div>
                    </div>
                )
            })}
        </footer>
        <div className=' footer-linkss' style={{textAlign: 'center',borderTop: '1px solid #fff', paddingTop: '10px', paddingBottom: '10px', color: '#fff'}}> <p style={{margin: '0 auto'}}>Copyright © 2023 eGradTutor All rights reserved</p>
     {/* <div className='linkIcons' style={{display: 'flex', }}>
          <div className='bgIconLink'>
          <i class="fa-brands fa-facebook"></i>
          </div>

          <div className='bgIconLink'>
          <i class="fa-brands fa-instagram"></i>          
          </div>

          <div className='bgIconLink'>
          <i class="fa-brands fa-linkedin"></i>
          </div>

          <div className='bgIconLink'>
          <i class="fa-brands fa-youtube"></i>          
          </div>
        </div>  */}
        </div>
    </div>
  )
}
export default Footer;