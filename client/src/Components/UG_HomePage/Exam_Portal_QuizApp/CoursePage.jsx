import React, { useEffect, useState } from "react";
import axios from "axios";
import MockTest from "../../../../Images/mock_test.jpg";
import { Link, useParams } from "react-router-dom";
import logo from "./asserts/logo.jpeg";
import { FooterData } from "./DATA/Data";

const CoursePage = () => {
  const { examId, examName } = useParams();
  const [courseCard, setCourseCard] = useState([]);
  const [noOfTests, setNoOfTests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/Cards/feachingcourse/${examId}`
        );
        setCourseCard(response.data);
        console.log(examId);
        console.log("API Response:", response.data); // Log the API response
        const courseResponse = await fetch(
          "http://localhost:5001/Cards/Test/count"
        );
        if (!courseResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const courseData = await courseResponse.json();
        setNoOfTests(courseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [examId]);

  const currentDate = new Date(); // Get the current date

  // Filter exams based on start and end dates
  const filteredCourses = courseCard.filter(
    (courseDetails) =>
      new Date(courseDetails.courseStartDate) <= currentDate &&
      currentDate <= new Date(courseDetails.courseEndDate)
  );

  console.log("Exam ID:", examId); // Log the examId
  console.log("Course Card State:", courseCard); // Log the courseCard state

  return (
    <div>
      <div className="header">
        <img className="header_logo" src={logo} alt="logo" width={200} />
        {/* <h3>{courseDetails.examName}</h3>  */}
        {/* {courseCard.map((heading)=>(
          <h2 style={{"color":"white"}}>{heading.examName}</h2>

        ))} */}
        {/* Check if courseCard has at least one item before accessing examName */}
        {courseCard.length > 0 && (
          <h2 style={{ color: "white" }}>{courseCard[0].examName}</h2>
        )}
      </div>
      {/* <div><Header/></div> */}

      <div className="container_H100">
        <ul className="card_container">
          {filteredCourses.map((courseDetails) => (
            <div key={courseDetails.courseCreationId} className="first_card">
              <img
                src={courseDetails.cardimeage}
                alt={courseDetails.examName}
              />

              <h3>{courseDetails.courseName}</h3>

              <li>
                Validity: ({courseDetails.courseStartDate}) to (
                {courseDetails.courseEndDate})
              </li>
              <li>Cost: {courseDetails.cost}</li>
              {/* <li>Discount: {courseDetails.Discount}%</li> */}
              {/* <li>Price after discount: {courseDetails.totalPrice}</li> */}
              <li>
                {noOfTests.map(
                  (count) =>
                    count.courseCreationId ===
                      courseDetails.courseCreationId && (
                      <p key={count.courseCreationId}>
                        No of Tests: {count.numberOfTests}
                      </p>
                    )
                )}
              </li>
              <br />
              <div className="start_now">
                <Link to={`/Test_List/${courseDetails.courseCreationId}`}>
                  Test Page
                </Link>
              </div>
            </div>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default CoursePage;

export const Footer = () => {
  return (
    <div className="footer-container footerBg">
      <footer className="footer">
        {FooterData.map((footerItem, footerIndex) => {
          return (
            <div key={footerIndex} className={footerItem.footerCLass}>
              <h4 className={footerItem.footerCs}>{footerItem.fotterTitles}</h4>
              <p>{footerItem.text}</p>

              <ul>
                <a href={footerItem.PrivacyPolicy}>
                  <li>{footerItem.home}</li>
                </a>

                <a href={footerItem.TermsAndConditions}>
                  <li>{footerItem.about}</li>
                </a>

                <a href={footerItem.RefundPolicy}>
                  <li>
                    {footerItem.career}
                    {footerItem.icon}
                  </li>
                </a>
              </ul>

              <div className="icontsFooter">
                <i id="footerIcons" className={footerItem.fb}></i>
                <i id="footerIcons" className={footerItem.insta}></i>
                <i id="footerIcons" className={footerItem.linkedin}></i>
                <i id="footerIcons" className={footerItem.youtube}></i>
              </div>
            </div>
          );
        })}
      </footer>
      <div
        className=" footer-linkss"
        style={{
          textAlign: "center",
          borderTop: "1px solid #fff",
          paddingTop: "10px",
          paddingBottom: "10px",
          color: "#fff",
        }}
      >
        {" "}
        <p style={{ margin: "0 auto" }}>
          Copyright © 2023 eGradTutor All rights reserved
        </p>
      </div>
    </div>
  );
};
