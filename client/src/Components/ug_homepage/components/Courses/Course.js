

import React from "react";
import { Course_data1, Course_data2,Course_data3 } from "./Course_data";
import "./course.css";

import { Link } from "react-router-dom";

const Course = () => {
  return (
    <div id="courses">
      <h2>OUR COURSES</h2>
      <div className="courses_sub_container">
        {Course_data1.map((Course_data1, index) => {
          return (
            <div key={index} className={Course_data1.Course_box1}>
              <div className="course_img1">
                {/* <img src={Course_data1.ots_olvc_QB_img1} alt="" /> */}
              </div>
              <ul>
              <h3>{Course_data1.course_title1}</h3>
<h4>Features</h4>
                <li>{Course_data1.course_pont1_1}</li>
                <li>{Course_data1.course_pont2_1}</li>
                <li>{Course_data1.course_pont3_1}</li>
                <li>{Course_data1.course_pont4_1}</li>
              </ul>
              <div className={Course_data1.course_bttons_list1}>
                <Link to={Course_data1.otsiitlink}>{Course_data1.c_btn1} <br/> <small className="ug_small_1">{Course_data1.small1}</small></Link>
                <Link to={Course_data1.otslinkneet}>{Course_data1.c_btn2}</Link>
                <Link to={Course_data1.otslinkbitsat}>{Course_data1.c_btn3}</Link>
                <Link to={""}>{Course_data1.c_btn4}</Link>
                <Link to={""}>{Course_data1.c_btn5}</Link>
                <Link to={""}>{Course_data1.c_btn6}</Link>
                <Link to={""}>{Course_data1.c_btn7}</Link>
                <Link to={""}>{Course_data1.c_btn8}</Link>
                <Link to={""}>{Course_data1.c_btn9}</Link>
                <Link to={""}>{Course_data1.c_btn10}</Link>
                <Link to={""}>{Course_data1.c_btn11}</Link>
              </div>
            </div>
          );
        })}
        {Course_data2.map((Course_data2, index) => {
          return (
            <div key={index} className={Course_data2.Course_box2}>
              <div className="course_img2">
                {/* <img src={Course_data2.ots_olvc_QB_img2} alt="" /> */}
              </div>
              <ul>
              <h3>{Course_data2.course_title2}</h3>
              <h4>Features</h4>

                <li>{Course_data2.course_pont1_2}</li>
                <li>{Course_data2.course_pont2_2}</li>
                <li>{Course_data2.course_pont3_2}</li>
                <li>{Course_data2.course_pont4_2}</li>
              </ul>
              <div className={Course_data2.course_bttons_list2}>
              <Link to={Course_data2.olvclinkiit}>{Course_data2.c_btn2_1} <br/> <small className="ug_small_2">{Course_data2.small2}</small></Link>
                <Link to={Course_data2.olvclinkneet}>{Course_data2.c_btn2_2}</Link>

              </div>
            </div>
          );
        })}
        {
          Course_data3.map((Course_data3,index)=>{
            return(
              <div key={index} className={Course_data3.Course_box3}>
                <div className={Course_data3.course_img3}>
                  {/* <img src={Course_data3.ots_olvc_QB_img3} alt="" /> */}
                </div>
                <ul>
                <h3>{Course_data3.course_title3}</h3>
                <h4>Features</h4>

                  <li>{Course_data3.course_pont1_3}</li>
                  <li>{Course_data3.course_pont2_3}</li>
                  <li>{Course_data3.course_pont3_3}</li>
                  <li>{Course_data3.course_pont3_4}</li>

                </ul>
                <div className={Course_data3.course_bttons_list3}>
                <Link to={''}>{Course_data3.c_btn3_1} <br/> <small className="ug_small_3">{Course_data3.small3}</small></Link>
                <Link to={''}>{Course_data3.c_btn3_2}</Link>

                </div>
              </div>
            )

          })
        }
      </div>
    </div>
  );
};

export default Course;
