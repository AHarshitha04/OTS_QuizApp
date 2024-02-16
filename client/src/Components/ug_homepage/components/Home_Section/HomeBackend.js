// import React, { useState, useEffect } from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import axios from "axios";


// import "./home.css";

// const HomeBackend = () => {

//   const [imageDataList1, setImageDataList1] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/HomeImages")
//       .then((response) => {
//         setImageDataList1(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching images:", error);
//       });
//   }, []);

//   return (
//     <div className="home-container" id="home">
//       <div className="home">
//         <marquee behavior="" direction="" className="marquee">
//           <p>
//             "All tests will be LIVE according to the detailed schedule given. Do
//             not confuse to the Total No. of tests in the test cards while buying
//             as they show the number of tests LIVE at the moment..",
//           </p>
//         </marquee>

//         <div className="banner_container">
//           <Carousel
//             autoPlay
//             infiniteLoop
//             showArrows={false}
//             interval={4600}
//             showThumbs={false}
//             // showIndicators={false}
//             showStatus={false}
//           >
//             {imageDataList1.map((imageData, index) => (
//               <img key={index} src={imageData} alt={`Image ${index + 1}`} />
//             ))}
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeBackend;


import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
 
 
import "./home.css";
 
const HomeBackend = () => {
 
  const [imageDataList1, setImageDataList1] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/HomeImages")
      .then((response) => {
        setImageDataList1(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);
 
  return (
    <div className="home-container" id="home">
      <div className="home">
        <marquee behavior="" direction="" className="marquee">
          <p>
            "All tests will be LIVE according to the detailed schedule given. Do
            not confuse to the Total No. of tests in the test cards while buying
            as they show the number of tests LIVE at the moment..",
          </p>
        </marquee>
 
        <div className="banner_container">
          <Carousel
            autoPlay
            infiniteLoop
            showArrows={false}
            interval={4600}
            showThumbs={false}
            // showIndicators={false}
            showStatus={false}
          >
            {imageDataList1.map((imageData, index) => (
              <img key={index} src={imageData} alt={`Image ${index + 1}`} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
 
export default HomeBackend;
 