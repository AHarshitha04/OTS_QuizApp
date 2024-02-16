import React, { useEffect, useState } from "react";

import iitjee from "../../../../Images/iit-jee-course.jpg";
import axios from "axios";

import { Link, Navigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { AiOutlineForm, AiFillDelete } from "react-icons/ai";

// ------------------------------------------------------------------------- data ---------------------------------------------

import {
  FooterData,
  nav,
  quiz__Home_continer_left,
  quiz__Home_continer_right,
} from "./DATA/Data";

// ------------------------------------------------------------------------- css ---------------------------------------------

import "./styles/Home.css";
import "./styles/Dashboard.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";

// ------------------------------------------------------------------------- program start  ---------------------------------------------

const Exam_portal_home_page = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/courses")
      .then((res) => {
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <Header />
      <div>
        <Home_section />
        <Quiz_Courses />
      </div>

      <Footer />
    </>
  );
};

export default Exam_portal_home_page;

// ------------------------------------------------------------------------- header start ---------------------------------------------

export const Header = () => {
  // ---------------------------------- login ---------------------------
  const [showloginQuiz, setShowloginQuiz] = useState(false);
  const [showRegisterQuiz, setShowRegisterQuiz] = useState(false);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const Quiz_login = () => {
    setShowloginQuiz(true);
  };

  const Quiz_register = () => {
    setShowRegisterQuiz(true);
  };

  const Quiz_close = () => {
    setShowloginQuiz(false);
    setShowRegisterQuiz(false);
  };
  const userRole = localStorage.getItem("userRole");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const checkLoggedIn = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      if (loggedIn === "true") {
        setIsLoggedIn(true);
        fetchUserData();
      }
    };
    checkLoggedIn();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5001/ughomepage_banner_login/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        // Token is expired or invalid, redirect to login page
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        Navigate("/uglogin"); // Assuming you have the 'navigate' function available

        return;
      }

      if (response.ok) {
        // Token is valid, continue processing user data
        const userData = await response.json();
        setUserData(userData);
        // ... process userData
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // const [courses, setCourses] = useState([]);
  const [examsug, setExamsug] = useState([0]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/examsug")
      .then((res) => {
        setExamsug(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [coursesBtnContainerVisible, setCoursesBtnContainerVisible] =
    useState(false);
  const toggleCoursesBtnContainer = () => {
    setCoursesBtnContainerVisible(!coursesBtnContainerVisible);
  };
  const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);

  const QuiZ_menu = () => {
    setShowQuizmobilemenu(!showQuizmobilemenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/uglogin";
  };

  const act_info = () => {
    if (user.role === "admin") {
      window.location.href = "/UgadminHome";
    } else {
      window.location.href = "/userdeatailspage/:id"; // Replace with the URL for user details page
    }
  };

  // ----------------- dashborad ---------------------/

  //  localStorage.setItem("isLoggedIn", "true");
  return (
    <>
      <div className="Quiz_main_page_header">
        {nav.map((nav, index) => {
          return (
            <div key={index} className="Quiz_main_page_navbar">
              <div className="Quizzlogo">
                <img src={nav.logo} alt="" />
              </div>
              {/* <li  className={showcardactive1?"showcardactive":"showcardactivenone"}> */}

              <div
                className={
                  !showQuizmobilemenu
                    ? "Quiz_main_page_navbar_SUBpart Quiz_main_page_navbar_SUBpart_mobile"
                    : "Quiz_main_page_navbar_SUBpart_mobile"
                }
              >
                <ul>
                  <button style={{ background: "none" }}>
                    <Link to="/home" className="Quiz__home">
                      Home
                    </Link>
                  </button>
                  <li className="courses_btn_continer">
                    <button
                      className="courses_btn"
                      onClick={toggleCoursesBtnContainer}
                    >
                      Courses
                    </button>
                    {coursesBtnContainerVisible ? (
                      <div className="courses">
                        {examsug.map((e) => {
                          return (
                            <div key={examsug.exam_id}>
                              <a href="">{e.exam_name} </a>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </li>

                  {/* <button className="quiz_sign_UP">                   
                    Sign up
                  </button> */}
                  <div className="Quiz_main_page_login_signUp_btn">
                    {/* 
                      <Link to='/'><button onClick={Quiz_login}>
                   Login
                  </button></Link> */}

                    {/* {userRole === "admin"  && (
                      <>
                        <li>
                          <button>
                            <Link to="/Quiz_dashboard">ADMIN Settings</Link>
                          </button>
                        </li>
                      </>
                    )} */}
                    {isLoggedIn === true ? (
                      <>
                        {(userRole === "admin" ||
                          userRole === "ugotsadmin" ||
                          userRole === "ugadmin") && (
                          <>
                            <li>
                              <button>
                                <Link to="/Quiz_dashboard">Admin Settings</Link>
                              </button>
                            </li>
                          </>
                        )}
                        {userRole === "viewer" && (
                          <>
                            <button>
                              <Link to="/student_dashboard">DashBoard</Link>
                            </button>
                          </>
                        )}
                      </>
                    ) : null}
                  </div>
                </ul>
              </div>

              <div className="quiz_app_quiz_menu_login_btn_contaioner">
                <div>
                  {isLoggedIn === true ? (
                    <>
                      {(userRole === "admin" ||
                        userRole === "ugotsadmin" ||
                        userRole === "ugadmin") && (
                        <>
                          <button id="dropdownmenu_foradim_page_btn">
                            <img
                              title={userData.username}
                              src={userData.imageData}
                              alt={`Image ${userData.user_Id}`}
                            />
                            <div className="dropdownmenu_foradim_page">
                              {/* <Link to={`/userread/${user.id}`} className="btn btn-success mx-2">Read</Link> */}
                              {/* <Link to={`/userdeatailspage/${user.id}`} >Account-info</Link> */}
                              <Link to="/student_dashboard">My profile</Link>
                              <Link onClick={handleLogout}>Logout</Link>
                            </div>
                          </button>
                        </>
                      )}

                      {userRole === "viewer" && (
                        <>
                          <button id="dropdownmenu_foradim_page_btn">
                            <img
                              title={userData.username}
                              src={userData.imageData}
                              alt={`Image ${userData.user_Id}`}
                            />
                            <div className="dropdownmenu_foradim_page">
                              {/* <Link to={`/userread/${user.id}`} className="btn btn-success mx-2">Read</Link> */}
                              {/* <Link to={`/userdeatailspage/${user.id}`} >Account-info</Link> */}
                              <Link to="/student_dashboard">My profile</Link>
                              <Link onClick={handleLogout}>Logout</Link>
                            </div>
                          </button>
                        </>
                      )}
                      {/* <button id="dropdownmenu_foradim_page_btn">
                          <img
                            title={userData.username}
                            src={userData.imageData}
                            alt={`Image ${userData.user_Id}`}
                          />
                          <div className="dropdownmenu_foradim_page">
                           
                            <Link to="/Account_info">My profile</Link>
                            <Link onClick={handleLogout}>Logout</Link>
                          </div>
                        </button> */}
                    </>
                  ) : (
                    <>
                      <a class="ugQUIz_login_btn" href="/UgadminHome">
                        Login/Registration
                      </a>
                    </>
                  )}

                  {isLoggedIn === "flase" && (
                    <>
                      <button id="dropdownmenu_foradim_page_btn">
                        {/* {userData.username} */}
                        <div className="dropdownmenu_foradim_page">
                          {/* <Link to={`/userread/${user.id}`} className="btn btn-success mx-2">Read</Link> */}

                          {/* <Link to={`/userdeatailspage/${user.id}`} >Acount-info</Link> */}
                          {/* <Link to="/Account_info">Acount-info</Link>

                            <Link onClick={handleLogout}>Logout</Link> */}
                        </div>
                      </button>
                    </>
                  )}
                </div>
                <div className="quz_menu" onClick={QuiZ_menu}>
                  <div className="lines"></div>
                  <div className="lines"></div>
                  <div className="lines"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// ------------------------------------------------------------------------- header end ---------------------------------------------

// ------------------------------------------------------------------------- home section ---------------------------------------------

export const Home_section = () => {
  const userRole = localStorage.getItem("userRole");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkLoggedIn = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      if (loggedIn === "true") {
        setIsLoggedIn(true);
        fetchUserData();
      }
    };
    checkLoggedIn();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5001/ughomepage_banner_login/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        // Token is expired or invalid, redirect to login page
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        Navigate("/uglogin"); // Assuming you have the 'navigate' function available

        return;
      }

      if (response.ok) {
        // Token is valid, continue processing user data
        const userData = await response.json();
        setUserData(userData);
        // ... process userData
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      <div className="quiz__Home_continer">
        {isLoggedIn === true ? (
          <>
            <h4>
              welcomes <span>{userData.username}</span> to EGRADTUTOR
            </h4>
          </>
        ) : null}

        <div>
          <div className="quiz__Home_continer_left">
            {quiz__Home_continer_left.map((home, index) => {
              return (
                <div key={index} className="quiz__Home_continer_left_subpart">
                  <h3>{home.home_title}</h3>
                  <div className="home_highlight_btns">
                    {/* <button>{home.course1}</button> */}
                    {/* <button>{home.course2}</button>
                                      <button>{home.course3}</button>
                                      <button>{home.course4}</button> */}
                  </div>
                  <div className="home_para_start">
                    <p>{home.our_info}</p>
                    <button>{home.get_started}</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="quiz__Home_continer_right">
            {quiz__Home_continer_right.map((homer, index) => {
              return (
                <div key={index}>
                  <Carousel
                    autoPlay
                    infiniteLoop
                    interval={5000}
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                  >
                    <div>
                      <img src={homer.carousel1} alt="" />
                    </div>
                    <div>
                      <img src={homer.carousel2} alt="" />
                    </div>
                    <div>
                      <img src={homer.carousel3} alt="" />
                    </div>
                    <div>
                      <img src={homer.carousel4} alt="" />
                    </div>
                  </Carousel>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

// ------------------------------------------------------------------------- home section end ---------------------------------------------

// ------------------------------------------------------------------------- Quiz_Courses ---------------------------------------------

export const Quiz_Courses = () => {
  // ----------------------------------------------------------courses ug states--------------------------------------------------------
  const [coursesug, setCoursesug] = useState([]);
  const [showcard1, setshowcard1] = useState(false);
  const [showcardactive1, setshowcardactive1] = useState(false);
  const [examsug, setExamsug] = useState([0]);
  // ----------------------------------------------------------currentcourses states--------------------------------------------------------
  const [coursescurrentug, setCoursescurrentug] = useState([]);
  const [examscurrentug, setExamscurrentug] = useState([0]);
  const [showcard2, setshowcard2] = useState(true);
  const [showcardactive2, setshowcardactive2] = useState(true);

  // ----------------------------------------------------------courses ug function--------------------------------------------------------

  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/coursesug")
      .then((res) => {
        setCoursesug(res.data);
        console.log(coursesug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ----------------------------------------------------------currentcourses function--------------------------------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/coursescurrentug")
      .then((res) => {
        setCoursescurrentug(res.data);
        console.log(coursesug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ----------------------------------------------------------examsug function--------------------------------------------------------

  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/examsug")
      .then((res) => {
        setExamsug(res.data);
        console.log(setExamsug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // ----------------------------------------------------------examexamscurrentugsug function--------------------------------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/examsug")
      .then((res) => {
        setExamsug(res.data);
        console.log(setExamsug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ---------------------------------------------------------- onclick displayexamsug function--------------------------------------------------------

  const displayexamsug = () => {
    setshowcard1(true);
    setshowcard2(false);
    setshowcardactive1(true);
    setshowcardactive2(false);
  };

  // ---------------------------------------------------------- onclick displaycurrentexamsug function--------------------------------------------------------
  const displaycurrentexamsug = () => {
    setshowcard1(false);
    setshowcard2(true);
    setshowcardactive1(false);
    setshowcardactive2(true);
  };

  const [examCardName, setExamCardName] = useState([]);
  const [noOfCourses, setNoOfCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examResponse = await axios.get(
          `http://localhost:5001/Cards/examData`
        );
        setExamCardName(examResponse.data);

        const courseResponse = await fetch(
          "http://localhost:5001/Cards/courses/count"
        );

        if (!courseResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const courseData = await courseResponse.json();
        setNoOfCourses(courseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNoexam(true); // Set Noexam to true if there is an error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date(); // Get the current date
  const filteredExams = examCardName.filter(
    (exam) =>
      new Date(exam.startDate) <= currentDate &&
      currentDate <= new Date(exam.endDate)
  );

  const [noexam, setNoexam] = useState(false);
  return (
    <>
      <div className="Quiz_cards_page">
        <div className="Quiz_cards_page_titles">
          {/* ------------------------ ug titles----------------------------- */}

          <div onClick={displaycurrentexamsug}>
            {coursescurrentug.map((e, i) => {
              return (
                <div key={i}>
                  <li
                    className={
                      showcardactive2 ? "showcardactive" : "showcardactivenone"
                    }
                  >
                    {e.course_name}
                  </li>
                </div>
              );
            })}
          </div>
          <div onClick={displayexamsug}>
            {coursesug.map((e, i) => {
              return (
                <div key={i}>
                  <li
                    className={
                      showcardactive1 ? "showcardactive" : "showcardactivenone"
                    }
                  >
                    {e.course_name}
                  </li>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {/* ------------------------ ug cards----------------------------- */}

          {showcard2 ? (
            <div className="Quiz_cards_cantainer_contain">
              {examscurrentug.map((e) => {
                return (
                  <div key={examsug.exam_id}>
                    {/* <a href=""><h1>{e.exam_name}</h1> </a>  */}

                    {/* ----------------------------------- h--------------------- */}
                    <div className="CurrentCourses_div">
                      {noexam ? (
                        <p>coming soon</p>
                      ) : (
                        <>
                          <div className="card_container">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              filteredExams.map((cardItem) => (
                                <React.Fragment key={cardItem.examId}>
                                  <div className="first_card">
                                    <img
                                      src={cardItem.cardimeage}
                                      alt={cardItem.examName}
                                    />
                                    <h3>{cardItem.examName}</h3>
                                    <li>
                                      Validity: ({cardItem.startDate}) to (
                                      {cardItem.endDate})
                                    </li>
                                    <li>
                                      {noOfCourses.map(
                                        (count) =>
                                          count.examId === cardItem.examId && (
                                            <li key={count.examId}>
                                              No of Courses:{" "}
                                              {count.numberOfCourses}
                                            </li>
                                          )
                                      )}
                                    </li>
                                    <li>
                                      <br />
                                      <div className="start_now">
                                        <Link
                                          to={{
                                            pathname: `/feachingcourse/${cardItem.examId}`,
                                            state: {
                                              examName: cardItem.examName,
                                            },
                                          }}
                                        >
                                          Start Now
                                        </Link>
                                      </div>
                                    </li>
                                  </div>
                                </React.Fragment>
                              ))
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    {/* ----------------------------------- h--------------------- */}
                  </div>
                );
              })}
            </div>
          ) : null}
          {showcard1 ? (
            <div className="Quiz_cards_cantainer_contain">
              {examsug.map((e) => {
                return (
                  <div key={examsug.exam_id}>
                    <a href="">
                      <h2>{e.exam_name}</h2>
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

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
