import React, { useState, useEffect } from "react";
import axios from "axios";
import { Exam_Explore_data, Examsliders } from "./Exam_Explore_data";

import { Link } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./exam.css";

const Exam_Explore = () => {
  const [imageDataList1, setImageDataList1] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/ExploreExam")
      .then((response) => {
        setImageDataList1(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);
  return (
    <div id="exam">
      <h2>EXPLORE EXAMS</h2>
      <div className="exam_sub_container">
        <div className="exam_box_left">
          {/* {Examsliders.map((Examsliders, index) => { */}

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
              {/* <div>
                    <img src={Examsliders.slide1} alt="" />
                  </div>
                  <div>
                    <img src={Examsliders.slide2} alt="" />
                  </div>
                  <div>
                    <img src={Examsliders.slide3} alt="" />
                  </div> */}
            </Carousel>
          </div>

          {/* })} */}
        </div>

        <div className="exam_box_right">
          {Exam_Explore_data.map((Exam_Explore_data, index, Exam) => {
            return (
              <div key={index}>
                <div className={Exam_Explore_data.exam_boxs}>
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to={Exam_Explore_data.examPage}
                    className={Exam_Explore_data.exams_buttons}
                  >
                    {Exam_Explore_data.exams_button}
                  </Link>
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to={Exam_Explore_data.otslink}
                    className={Exam_Explore_data.exams_buttons_normal}
                  >
                    {Exam_Explore_data.ots}
                  </Link>
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to={Exam_Explore_data.olvclink}
                    className={Exam_Explore_data.exams_buttons_normal}
                  >
                    {Exam_Explore_data.olvc}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Exam_Explore;
