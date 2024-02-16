import React from "react";
//  ----------------------components-------------------
import Header from "./components/Header/Header";
import Home from "./components/Home_Section/Home";
import About from "./components/About_section/About";

import Exam_Explore from "./components/ExploreExam/Exam_Explore";
import Course from "./components/Courses/Course";
import Contact from "./components/Contact/Contact";
import Faq from "./components/Faqs/Faq";

// import { Ug_About } from "../UG/Ug_homePage_k/Ug_About/Ug_About";
import Footer from './components/Footer/Footer'
import HomeBackend from "./components/Home_Section/HomeBackend";
//  ----------------------commmon css-------------------
// import "./app.css"

const UG_HOME = () => {
  return (
    <>
      <Header />
      {/* <Home />       */}
      <HomeBackend />      
  
      <Exam_Explore />
      <Course />
      <About />
      <Contact />
      <Faq />
      <Footer />
    </>
  );
};

export default UG_HOME;
