import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import "./styles/Instructions.scss";
// =============================== nav-data ===============================
import { Navbar, Intro_content } from "./DATA/Introduction_page_DATA";

// =============================== css ===============================
// import "./styles/introducationpage.css";
const Introduction_page = () => {
  return (
    <>
      <Header />

      <Intro_container />
    </>
  );
};

export default Introduction_page;

export const Header = () => {
  const [testName, setTestName] = useState("");
  const { testCreationTableId } = useParams();
  useEffect(() => {
    fetchTestName();
  }, [testCreationTableId]); // Re-fetch test name when testCreationTableId changes

  const fetchTestName = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
      );
      const data = await response.json();
      const testName = data.questions[0].TestName;
      setTestName(testName);
    } catch (error) {
      console.error("Error fetching test name:", error);
    }
  };

  return (
    <>
      {Navbar.map((nav, index) => {
        return (
          <div className="Quiz_header" key={index}>
            <div className="Q_logo">
              <img src={nav.Q_logo} alt="" />
            </div>
            <div className="Q_title">
              {/* <h1>{nav.Q_page_title}</h1> */}
              <h1 key={testName.testCreationTableId}>{testName}</h1>
            </div>
          </div>
        );
      })}
    </>
  );
};
export const Intro_container = () => {
  const { testCreationTableId, subjectId } = useParams();
  const [SubjectData, setSubjectData] = useState([]);

  const [minsubjectid, setminsubjectid] = useState("");
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/Cards/subjectData2/${testCreationTableId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Corrected line: Set the state using the retrieved data
        setSubjectData(data);
        console.log(data);

        if (data && data.length > 0) {
          // Find the minimum value of subjectId in the array
          const minSubjectId = Math.min(...data.map((item) => item.subjectId));

          // Log the minimum value to the console
          console.log("Minimum subjectId:", minSubjectId);

          setminsubjectid(minSubjectId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSubjects();
  }, [subjectId]);

  const [SectionData, setSectionData] = useState([]);
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/Cards/fetchSections/${testCreationTableId}/${subjectId}`
        );
        const data = await response.json();
        setSectionData(data);
        console.log(SectionData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSections();
  }, [subjectId]);

  const [testData, setTestData] = useState([]);
  const { courseCreationId } = useParams();
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const responseTest = await fetch(
          `http://localhost:5001/Cards/feachingtest/${courseCreationId}`
        );
        const testData = await responseTest.json();
        setTestData(testData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestData();
  }, [courseCreationId]);

  return (
    <>
      {Intro_content.map((Intro_content, index) => {
        return (
          <div key={index} className="Q_container">
            <h2>{Intro_content.Intro_content_text_center}</h2>
            <h3>{Intro_content.Intro_content_text_subheading_1}</h3>
            <ol>
              <li>{Intro_content.Intro_content_points_1}</li>
              <li>{Intro_content.Intro_content_points_2}</li>
              <li>{Intro_content.Intro_content_points_3}</li>
              <div className="img_container">
                <p>
                  <div className=" intro_img intro_img1">1</div>{" "}
                  {Intro_content.Intro_content_points_p1}
                </p>
                <p>
                  <div className=" intro_img intro_img2">3</div>
                  {Intro_content.Intro_content_points_p2}
                </p>
                <p>
                  <div className="  intro_img intro_img3">5</div>
                  {Intro_content.Intro_content_points_p3}
                </p>
                <p>
                  <div className=" intro_img intro_img4">7</div>
                  {Intro_content.Intro_content_points_p4}
                </p>
                <p>
                  <div className=" intro_img intro_img5">9</div>
                  {Intro_content.Intro_content_points_p5}
                </p>
              </div>
              <p>{Intro_content.Intro_content_points_p}</p>
              <h3>{Intro_content.Intro_content_text_subheading_2}</h3>
              <li>
                {Intro_content.Intro_content_points_4}

                <ol>
                  <li>{Intro_content.Intro_content_points_4_a}</li>
                  <li>{Intro_content.Intro_content_points_4_b}</li>
                  <li>{Intro_content.Intro_content_points_4_c}</li>
                </ol>
              </li>

              <li>
                {Intro_content.Intro_content_points_5}{" "}
                <span> {Intro_content.span_1}</span>
                {Intro_content.Intro_content_points_5__}
              </li>
              <h3>{Intro_content.Intro_content_text_subheading_3}</h3>
              <li>
                {Intro_content.Intro_content_points_6}
                <ol>
                  <li>{Intro_content.Intro_content_points_6_a}</li>
                  <li>{Intro_content.Intro_content_points_6_b}</li>
                  <li>
                    {Intro_content.Intro_content_points_6_c}
                    <span> {Intro_content.span_2}</span>
                  </li>
                  <li>
                    {Intro_content.Intro_content_points_6_d}
                    <span> {Intro_content.span_3}</span>{" "}
                    {Intro_content.Intro_content_points_6_d__}
                  </li>
                  <li>{Intro_content.Intro_content_points_6_e}</li>
                </ol>
              </li>
              <li>
                {Intro_content.Intro_content_points_7}
                <span> {Intro_content.span_4}</span>{" "}
                {Intro_content.Intro_content_points_7__}
              </li>
              <li>{Intro_content.Intro_content_points_8}</li>
              <h3>{Intro_content.Intro_content_text_subheading_4}</h3>
              <li>{Intro_content.Intro_content_points_9}</li>
              <li>{Intro_content.Intro_content_points_10}</li>
              <li>{Intro_content.Intro_content_points_11}</li>
              <li>{Intro_content.Intro_content_points_12}</li>
            </ol>
          </div>
        );
      })}

      <div className="intro_next_btn_container">
        <Link
          to={`/General_intructions_page/${testCreationTableId}`}
          className="intro_next_btn"
        >
          NEXT <AiOutlineArrowRight />
        </Link>
      </div>
    </>
  );
};
