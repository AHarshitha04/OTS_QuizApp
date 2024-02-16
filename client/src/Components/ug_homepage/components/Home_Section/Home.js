// import React from "react";

// import { AiFillDownCircle } from "react-icons/ai";
// // ----------------------------Typewriter------------------------------------
// import Typewriter from "typewriter-effect";
// // ---------------------- Carousel------------------------------------------
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// // ---------------------------home data---------------------------
// import { HomeDATA } from "./HomeData";

// // ------------------------------ home css--------------------------------
// import "./home.css";

// const Home = () => {
//   return (
//     <>
//       <div className="home-container" id="home">
//         {HomeDATA.map((HomeDATA, index) => {
//           return (
//             <div className={HomeDATA.home} key={index}>
//               <marquee behavior="" direction="">
//                 <p>{HomeDATA.scrollbar}</p>
//               </marquee>
//               <div className={HomeDATA.banner_container}>
//                 <Carousel
//                   autoPlay
//                   infiniteLoop
//                   showArrows={false}
//                   interval={4600}
//                   showThumbs={false}
//                   showIndicators={false}
//                   showStatus={false}
//                 >
//                   <div className={HomeDATA.banner}>
//                     <div className="hero-left">
//                       {/* <h1> */}
//                         {/* <Typewriter
//                           options={{
//                             strings: ["Welcome to eGRADTutor"],
//                             autoStart: true,
//                             loop: true,
//                           }}
//                         /> */}
//                         {/* Welcome to eGRADTutor
//                       </h1> */}

//                       {/* <p>
//                         eGRADTutor is an Edtech firm started with a vision to
//                         blend the boundaries in education and take best-in-class
//                         courses and teachers virtually to every corner of the
//                         country. Our courses are developed by the alumni of
//                         IITs/IISc with an intent to enhance the student's
//                         abilities to face some of the toughest exams of the
//                         country. Our offerings not just provide a deeper
//                         understanding of the subjects to the students, but they
//                         also make them exam ready.
//                       </p> */}
//                     </div>
//                     {/* <div>
//                       <a href="#courses" className={HomeDATA.explore_btn}>
//                         EXPLORE NOW
//                       </a>
//                     </div> */}

//                  {/* <div className={HomeDATA.downarrow_container}>

//                       <a href="#about"  className={HomeDATA.downarrow}>
//                       scroll down
//                         <AiFillDownCircle />
//                       </a>
//                     </div> */}
//                     <img src={HomeDATA.bg} alt="" />

//                   </div>
//                   <div className={HomeDATA.banner}>
//                     <img src={HomeDATA.b1} alt="" />

//                     {/* <a href="#" className={HomeDATA.explore_btn}>
//                       EXPLORE NOW
//                     </a> */}

//                  <div className={HomeDATA.downarrow_container}>

//                      {/* <a href=""  className={HomeDATA.downarrow}>

//                         <AiFillDownCircle />
//                       </a> */}
//                     </div>
//                   </div>
//                   <div className={HomeDATA.banner}>
//                     <img src={HomeDATA.b2} alt="" />
//                     {/* <a href="#" className={HomeDATA.explore_btn}>
//                       EXPLORE NOW
//                     </a> */}

//                  <div className={HomeDATA.downarrow_container}>

//                      {/* <a href=""  className={HomeDATA.downarrow}>

//                         <AiFillDownCircle />
//                       </a> */}
//                     </div>
//                   </div>
//                   <div className={HomeDATA.banner}>
//                     <img src={HomeDATA.b3} alt="" />
//                     {/* <a href="#" className={HomeDATA.explore_btn}>
//                       EXPLORE NOW
//                     </a> */}

//                  {/* <div className={HomeDATA.downarrow_container}>

//                      <a href=""  className={HomeDATA.downarrow}>
//                      scrolldown
//                         <AiFillDownCircle />
//                       </a>
//                     </div> */}
//                   </div>
//                   <div className={HomeDATA.banner}>
//                     <img src={HomeDATA.b1} alt="" />
//                     {/* <a href="#" className={HomeDATA.explore_btn}>
//                       EXPLORE NOW
//                     </a> */}

//                  {/* <div className={HomeDATA.downarrow_container}>

//                      <a href=""  className={HomeDATA.downarrow}>

//                         <AiFillDownCircle />
//                       </a>
//                     </div> */}
//                   </div>
//                   <div className={HomeDATA.banner}>
//                     <img src={HomeDATA.b5} alt="" />
//                     {/* <a href="#" className={HomeDATA.explore_btn}>
//                       EXPLORE NOW
//                     </a> */}

//                  {/* <div className={HomeDATA.downarrow_container}>

//                      <a href=""  className={HomeDATA.downarrow}>

//                         <AiFillDownCircle />
//                       </a>
//                     </div> */}
//                   </div>
//                   <div className={HomeDATA.banner}>
//                     <img src={HomeDATA.b6} alt="" />
//                     {/* <a href="#" className={HomeDATA.explore_btn}>
//                       EXPLORE NOW
//                     </a> */}

//                  {/* <div className={HomeDATA.downarrow_container}>

//                      <a href=""  className={HomeDATA.downarrow}>

//                         <AiFillDownCircle />
//                       </a>
//                     </div> */}
//                   </div>

//                 </Carousel>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Home;

// ------------------------------------------------------------------- new  design  home page-------------------------------------------------------------------
import React from "react"; 

import { AiFillDownCircle } from "react-icons/ai";
// ----------------------------Typewriter------------------------------------
import Typewriter from "typewriter-effect";
// ---------------------- Carousel------------------------------------------
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// ---------------------------home data---------------------------
import { HomeDATA } from "./HomeData";

// ------------------------------ home css--------------------------------
import "./home.css";
import Marquee from "react-fast-marquee";

const Home = () => {
  return (
    <>
      <div className="home-container" id="home">
        {HomeDATA.map((HomeDATA, index) => {
          return (
            <div className={HomeDATA.home} key={index}>
             < Marquee pauseOnHover={true} className="marquee">              {/* <marquee behavior="" direction="" className="marquee"> */}
                <p>{HomeDATA.scrollbar}</p>
              </Marquee>
              <div className={HomeDATA.banner_container}>
                <Carousel
                  autoPlay
                  infiniteLoop
                  showArrows={false}
                  interval={4600}
                  showThumbs={false}
                  // showIndicators={false}
                  showStatus={false}
                >
                  <div className={HomeDATA.banner}>
                    <div className="hero-left">
                      {/* <h1> */}
                      {/* <Typewriter
                          options={{
                            strings: ["Welcome to eGRADTutor"],
                            autoStart: true,
                            loop: true,
                          }}
                        /> */}
                      {/* Welcome to eGRADTutor
                      </h1> */}

                      {/* <p>
                        eGRADTutor is an Edtech firm started with a vision to
                        blend the boundaries in education and take best-in-class
                        courses and teachers virtually to every corner of the
                        country. Our courses are developed by the alumni of
                        IITs/IISc with an intent to enhance the student's
                        abilities to face some of the toughest exams of the
                        country. Our offerings not just provide a deeper
                        understanding of the subjects to the students, but they
                        also make them exam ready.
                      </p> */}
                    </div>
                    {/* <div>
                      <a href="#courses" className={HomeDATA.explore_btn}>
                        EXPLORE NOW
                      </a>
                    </div> */}

                    {/* <div className={HomeDATA.downarrow_container}>

                      <a href="#about"  className={HomeDATA.downarrow}>
                      scroll down
                        <AiFillDownCircle />
                      </a>
                    </div> */}
                    <img src={HomeDATA.bg} alt="" />
                  </div>
                  <div className={HomeDATA.banner}>
                    <img src={HomeDATA.b1} alt="" />

                    {/* <a href="#" className={HomeDATA.explore_btn}>
                      EXPLORE NOW
                    </a> */}

                    <div className={HomeDATA.downarrow_container}>
                      {/* <a href=""  className={HomeDATA.downarrow}>

                        <AiFillDownCircle />
                      </a> */}
                    </div>
                  </div>
                  <div className={HomeDATA.banner}>
                    <img src={HomeDATA.b2} alt="" />
                    {/* <a href="#" className={HomeDATA.explore_btn}>
                      EXPLORE NOW
                    </a> */}

                    <div className={HomeDATA.downarrow_container}>
                      {/* <a href=""  className={HomeDATA.downarrow}>

                        <AiFillDownCircle />
                      </a> */}
                    </div>
                  </div>
                  <div className={HomeDATA.banner}>
                    <img src={HomeDATA.b3} alt="" />
                    {/* <a href="#" className={HomeDATA.explore_btn}>
                      EXPLORE NOW
                    </a> */}

                    {/* <div className={HomeDATA.downarrow_container}>

                     <a href=""  className={HomeDATA.downarrow}>
                     scrolldown
                        <AiFillDownCircle />
                      </a>
                    </div> */}
                  </div>
                  <div className={HomeDATA.banner}>
                    <img src={HomeDATA.b1} alt="" />
                    {/* <a href="#" className={HomeDATA.explore_btn}>
                      EXPLORE NOW
                    </a> */}

                    {/* <div className={HomeDATA.downarrow_container}>

                     <a href=""  className={HomeDATA.downarrow}>

                        <AiFillDownCircle />
                      </a>
                    </div> */}
                  </div>
                  <div className={HomeDATA.banner}>
                    <img src={HomeDATA.b5} alt="" />
                    {/* <a href="#" className={HomeDATA.explore_btn}>
                      EXPLORE NOW
                    </a> */}

                    {/* <div className={HomeDATA.downarrow_container}>

                     <a href=""  className={HomeDATA.downarrow}>

                        <AiFillDownCircle />
                      </a>
                    </div> */}
                  </div>
                  <div className={HomeDATA.banner}>
                    <img src={HomeDATA.b6} alt="" />
                    {/* <a href="#" className={HomeDATA.explore_btn}>
                      EXPLORE NOW
                    </a> */}

                    {/* <div className={HomeDATA.downarrow_container}>

                     <a href=""  className={HomeDATA.downarrow}>

                        <AiFillDownCircle />
                      </a>
                    </div> */}
                  </div>
                </Carousel>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
