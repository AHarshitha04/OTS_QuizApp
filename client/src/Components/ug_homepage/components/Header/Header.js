// import { React, useState } from "react";
// import { Link } from "react-router-dom";

// // ----------------header css------------------------
// import "./header.css";

// // ----------------navbardata_------------------------

// import { NavData } from "./NavData";

// const Header = () => {
//   const [showMenu, setshowMenu] = useState(0);
//   return (
//     <>
//       <div className="ug_header">
//         {NavData.map((NavData, index) => {
//           return (
//             <div className="header" key={index}>
//               <div className={NavData.logo_img_container}>
//                 <Link to={"/"}>
//                   {" "}
//                   <img src={NavData.logo} alt="" />
//                 </Link>
//               </div>
//               <div className={showMenu ? "navbox  mobile-menu" : "navbox "}>
//                 <ul className={NavData.navbar}>
//                   <li>
//                     <a href="#home" className={NavData.navlist}>
//                       {NavData.link1}
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#about" className={NavData.navlist}>
//                       {NavData.link2}
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#exam" className={NavData.navlist}>
//                       {NavData.link3}
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#courses" className={NavData.navlist}>
//                       {NavData.link4}
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" id="ughomepage_dropdown_download_linK" className={NavData.navlist}>
//                       {NavData.link7}
//                       <ul className="ughomepage_dropdown_download">
//                         <li>
//                           <a href="#">{NavData.link7_dp1}</a>
//                         </li>
//                         <li>
//                           <a href="#">{NavData.link7_dp2}</a>
//                         </li>
//                       </ul>
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#contact" className={NavData.navlist}>
//                       {NavData.link5}
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#faq" className={NavData.navlist}>
//                       {NavData.link6}
//                     </a>
//                   </li>
//                 </ul>
//               </div>

//               <div className="login_menu">

//                 <a
//                   href="https://online-ug.egradtutor.in"
//                   className={NavData.login}
//                 >
//                   {NavData.btn1}
//                 </a>
//                 <div className="mobile_menu mobile_menu_non" onClick={() => setshowMenu(!showMenu)}  >
//                   <div className={showMenu ? "rotate_right  " : "lines "}></div>
//                   <div className={showMenu ? "no_lines  " : "lines "}></div>
//                   <div className={showMenu ? "rotate_left  " : "lines "}></div>
//                 </div>
//                 {/* <a href="#"><AiOutlineMenu/></a> */}{" "}
//               </div>
//             </div>

//           );
//         })}

//       </div>
//     </>
//   );
// };

// export default Header;

import { React, useState } from "react";
import { Link } from "react-router-dom";

// ----------------header css------------------------
import "./header.css";

// ----------------navbardata_------------------------

import { NavData } from "./NavData";

const Header = () => {
  const [showMenu, setshowMenu] = useState(0);
  return (
    <>
      <div className="ug_header">
        {NavData.map((NavData, index) => {
          return (
            <div className="header" key={index}>
              <div className="logo-header">
                <div className={NavData.logo_img_container}>
                  <Link to={"/"}>
                    {" "}
                    <img src={NavData.logo} alt="" />
                  </Link>
                </div>

                <div className="login_menu">
                  <Link
                    to="/Exam_portal_home_page"
                    target="_blank"
                    className={NavData.login}
                  >
                    {NavData.btn1}
                  </Link>
                  <div
                    className="mobile_menu mobile_menu_non"
                    onClick={() => setshowMenu(!showMenu)}
                  >
                    <div
                      className={showMenu ? "rotate_right  " : "lines "}
                    ></div>
                    <div className={showMenu ? "no_lines  " : "lines "}></div>
                    <div
                      className={showMenu ? "rotate_left  " : "lines "}
                    ></div>
                  </div>
                  {/* <a href="#"><AiOutlineMenu/></a> */}{" "}
                </div>
              </div>

              <div className={showMenu ? "navbox  mobile-menu" : "navbox "}>
                <ul className={NavData.navbar}>
                  <li>
                    <a href="#home" className={NavData.navlist}>
                      {NavData.link1}
                    </a>
                  </li>
                  <li>
                    <a href="#exam" className={NavData.navlist}>
                      {NavData.link2}
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className={NavData.navlist}>
                      {NavData.link3}
                    </a>
                  </li>
                  <li>
                    <a href="#about" className={NavData.navlist}>
                      {NavData.link4}
                    </a>
                  </li>

                  <li>
                    <a href="#contact" className={NavData.navlist}>
                      {NavData.link5}
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className={NavData.navlist}>
                      {NavData.link6}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      id="ughomepage_dropdown_download_linK"
                      className={NavData.navlist}
                    >
                      {NavData.link7}
                      <ul className="ughomepage_dropdown_download">
                        <li>
                          <a href="#">{NavData.link7_dp1}</a>
                        </li>
                        <li>
                          <a href="#">{NavData.link7_dp2}</a>
                        </li>
                      </ul>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Header;
