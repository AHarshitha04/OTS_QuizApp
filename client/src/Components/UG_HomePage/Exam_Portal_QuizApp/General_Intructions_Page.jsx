import React, { useEffect, useRef, useState } from "react";
import {
  General_intructions_page_content,
  Navbar,
} from "./DATA/Introduction_page_DATA";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";

const General_intructions_page = () => {
  return (
    <>
      <General_intructions_page_header />
      <General_intructions_page_container seconds={600} />
    </>
  );
};

export default General_intructions_page;

export const General_intructions_page_header = () => {
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
          <div className="Quiz_General_header" key={index}>
            {/* <h1>{nav.Q_page_title}</h1> */}
            <div className="Q_title">{/* <p>{nav.time_limt}</p> */}</div>
            <h1 key={testName.testCreationTableId}>{testName}</h1>
          </div>
        );
      })}
    </>
  );
};

export const General_intructions_page_container = ({ seconds }) => {
  const [countdown, setCountdown] = useState(seconds);
  const timerId = useRef();

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      alert("End");
    }
  }, [countdown]);
  const navigate = useNavigate();
  const startCountdown = () => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    navigate("/Paper1");
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const [instructionsData, setInstructionsData] = useState([]);
  const { testCreationTableId, subjectId, sectionId } = useParams();
  console.log("testCreationTableId:", testCreationTableId);

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/Cards/fetchinstructions/${testCreationTableId}/`
        );
        const data = await response.json();
        setInstructionsData(data);
        // setSubjectData(instructionsData);
        // console.log(instructionsData)
      } catch (error) {
        console.error(error);
      }
    };
    fetchInstructions();
  }, [testCreationTableId, subjectId]);

  // sectionId
  const [SubjectData, setSubjectData] = useState([]);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/Cards/subjectData/${subjectId}`
        );
        const data = await response.json();
        setSubjectData(data);
        console.log(SubjectData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubjects();
  }, [subjectId]);

  const [SectionData, setSectionData] = useState([]);
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/Cards/fetchSections/${sectionId}`
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

  const newWinRef = useRef(null);
  const openPopup = () => {
    newWinRef.current = window.open(
      `/getPaperData/${testCreationTableId}`,
      "_blank", // Use '_blank' to open in a new window or tab
      "width=1000,height=1000"
    );

    document.onmousedown = focusPopup;
    document.onkeyup = focusPopup;
    document.onmousemove = focusPopup;
  };

  const focusPopup = () => {
    if (newWinRef.current && !newWinRef.current.closed) {
      newWinRef.current.focus();
    }
  };

  return (
    <>
      <div className="Instructions_container">
        <h1>General Instructions</h1>
        <ul className="Instructions_points">
          {instructionsData.map((instruction, index) => (
            <React.Fragment key={instruction.id}>
              {index === 0 && <h2>{instruction.instructionHeading}</h2>}
              <li className="Instructions_points_list">{instruction.points}</li>
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div>
        {/* <input type="checkbox" onClick={checkbox}/> */}

        <div className="gn_checkbox">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            className="checkbox"
          />
          <p>
            I agree to these <b> Terms and Conditions.</b>
          </p>
        </div>
      </div>

      <div className="gn_next_btn_container">
        {isChecked ? (
          <Link
            className="gn_next_btn"
            to={`/QuestionPaper/questionOptions/${testCreationTableId}`}
          >
            I am ready to begin <AiOutlineArrowRight />
          </Link>
        ) : (
          <div>
            <span className="disabled-link gn_next_btn_bull ">
              I am ready to begin <AiOutlineArrowRight />
            </span>
          </div>
        )}
      </div>
    </>
  );
};
