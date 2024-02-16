import React from "react";

// ------------------------about data -------------------------------------
import { AboutData } from "./AboutData.";

// ------------------------about css -------------------------------------
import "./about.css";

const About = () => {
  return (
    <div id="about">
      {AboutData.map((AboutData, index) => {
        return (
          <div className={AboutData.about_container} key={index}>
            <h2>{AboutData.about_title}</h2>
            <div className={AboutData.about_left}>
              <div className={AboutData.about_img_container}>
                <img src={AboutData.about_img} alt="" />
              </div>
              <div className="about_left_inf">
                <p>{AboutData.about_info}</p>
              </div>
            </div>
            <div className={AboutData.about_right}>
              <div className={AboutData.about_vision_box}>
                <div className={AboutData.about_vision_subbox}>
                  <div className={AboutData.mVimg}>
                    <img src={AboutData.about_visoin_img} alt="" />
                  </div>
                  <h3>{AboutData.about_box_title1}</h3>

                  <div className={AboutData.about_vision_subbox_info}>
                    <p>{AboutData.about_box_info}</p>
                    <ol type="1">
                      <p>Values:</p>
                      <li>{AboutData.about_box_point1}</li>
                      <li>{AboutData.about_box_point2}</li>
                      <li>{AboutData.about_box_point3}</li>
                      <li>{AboutData.about_box_point4}</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className={AboutData.about_mission_box}>
                <div className={AboutData.about_mision_subbox}>
                  <div className={AboutData.mVimg}>
                    <img src={AboutData.about_misoin_img} alt="" />
                  </div>
                  <h3>{AboutData.about_box_title2}</h3>

                  <div className={AboutData.about_vision_subbox_info}>
                    <li>{AboutData.about_box_info1}</li>
                    <li>{AboutData.about_box_info2}</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default About;
