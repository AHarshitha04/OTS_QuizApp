import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import "./styles/RightSidebar.css";
import axios from "axios";

const ButtonsFunctionality = ({
  onQuestionSelect,
  questionStatus,
  seconds,
  setQuestionStatus,
  answeredCount,
  notAnsweredCount,
  answeredmarkedForReviewCount,
  markedForReviewCount,
  VisitedCount,
  questionData,
  updateQuestionStatus,
}) => {
  const [wtimer, setWTimer] = useState(0);

  const questions = questionData.questions ? questionData.questions.length : 0;
  const remainingQuestions =
    questions - VisitedCount - notAnsweredCount - answeredCount - markedForReviewCount - answeredmarkedForReviewCount;
  
  const NotVisited = remainingQuestions < 0 ? 0 : remainingQuestions;
  
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const renderQuestionButtons = Array.isArray(questionData.questions)
    ? questionData.questions.map((question, index) => {
        let className = "right_bar_Buttons ";
        const questionKey = question.id || index;
        const questionStatusAtIndex = questionStatus && questionStatus[index];

        if (questionStatusAtIndex === "answered") {
          className += " instruction-btn1";
        } else if (questionStatusAtIndex === "notAnswered") {
          className += " instruction-btn2";
        } else if (questionStatusAtIndex === "marked") {
          className += " instruction-btn3";
        } else if (questionStatusAtIndex === "Answered but marked for review") {
          className += " instruction-btn4";
        } else if (questionStatusAtIndex === "notVisited") {
          className += " instruction-btn5";
        }

        // Highlight the current question being displayed
        if (index === activeQuestion) {
          className += " active-question";
        }
        // Different tooltip text for each button
        let tooltipText = "";
        if (questionStatusAtIndex === "answered") {
          tooltipText = "Answered";
        } else if (questionStatusAtIndex === "notAnswered") {
          tooltipText = "Not Answered";
        } else if (questionStatusAtIndex === "marked") {
          tooltipText = "Marked for review";
        } else if (questionStatusAtIndex === "Answered but marked for review") {
          tooltipText = "Answered but marked for review";
        } else if (questionStatusAtIndex === "notVisited") {
          tooltipText = "Not Visited";
        }

        return (
          <li key={questionKey}>
            <button
              onClick={() => handleButtonClick(index + 1)}
              className={className}
              title={tooltipText}
            >
              {index + 1}
            </button>
          </li>
        );
      })
    : null;

  // const handleButtonClick = useCallback(
  //   (questionNumber) => {
  //     const questionIndex = questionNumber - 1;

  //     if (questionStatus[questionIndex] === "answered") {
  //       // If answered, navigate to the selected question
  //       onQuestionSelect(questionNumber);
  //     } else if (
  //       questionStatus[questionIndex] === "notAnswered" ||
  //       questionStatus[questionIndex] === "notVisited"
  //     ) {
  //       setQuestionStatus((prevQuestionStatus) => [
  //         ...prevQuestionStatus.slice(0, questionIndex),
  //         "notAnswered",
  //         ...prevQuestionStatus.slice(questionIndex + 1),
  //       ]);

  //       // Update other necessary state or perform additional logic
  //       onQuestionSelect(questionNumber, "notAnswered");
  //       setAnsweredQuestions((prevAnsweredQuestions) => [
  //         ...prevAnsweredQuestions,
  //         questionNumber,
  //       ]);
  //       setIsPaused(false);
  //     } else {
  //       // If the button was clicked, mark it as answered
  //       setQuestionStatus((prevQuestionStatus) => [
  //         ...prevQuestionStatus.slice(0, questionIndex),
  //         "answered",
  //         ...prevQuestionStatus.slice(questionIndex + 1),
  //       ]);

  //       // Update other necessary state or perform additional logic
  //       onQuestionSelect(questionNumber);
  //       setAnsweredQuestions((prevAnsweredQuestions) => [
  //         ...prevAnsweredQuestions,
  //         questionNumber,
  //       ]);
  //       setIsPaused(false);
  //     }

  //     // Update the question status in the QuestionPaper component
  //     updateQuestionStatus(questionStatus[questionIndex]);
  //   },
  //   [
  //     questionStatus,
  //     setQuestionStatus,
  //     onQuestionSelect,
  //     answeredQuestions,
  //     updateQuestionStatus
  //   ]
  // );
  const handleButtonClick = useCallback(
    (questionNumber) => {
      const questionIndex = questionNumber - 1;
  
      if (
        questionStatus[questionIndex] === "answered" ||
        questionStatus[questionIndex] === "notAnswered" ||
        questionStatus[questionIndex] === "notVisited"
      ) {
        // If the question is answered, not answered, or not visited, update the status
        setQuestionStatus((prevQuestionStatus) => [
          ...prevQuestionStatus.slice(0, questionIndex),
          "notAnswered",
          ...prevQuestionStatus.slice(questionIndex + 1),
        ]);
  
        // Update other necessary state or perform additional logic
        onQuestionSelect(questionNumber, "notAnswered");
        setAnsweredQuestions((prevAnsweredQuestions) => [
          ...prevAnsweredQuestions,
          questionNumber,
        ]);
        setIsPaused(false);
      } else {
        // If the button was clicked, mark it as answered
        setQuestionStatus((prevQuestionStatus) => [
          ...prevQuestionStatus.slice(0, questionIndex),
          "answered",
          ...prevQuestionStatus.slice(questionIndex + 1),
        ]);
  
        // Update other necessary state or perform additional logic
        onQuestionSelect(questionNumber);
        setAnsweredQuestions((prevAnsweredQuestions) => [
          ...prevAnsweredQuestions,
          questionNumber,
        ]);
        setIsPaused(false);
      }
  
      // Update the question status in the QuestionPaper component
      updateQuestionStatus(questionStatus[questionIndex]);
    },
    [
      questionStatus,
      setQuestionStatus,
      onQuestionSelect,
      answeredQuestions,
      updateQuestionStatus
    ]
  );
  
  ButtonsFunctionality.propTypes = {
    onQuestionSelect: PropTypes.func.isRequired,
    questionStatus: PropTypes.arrayOf(PropTypes.string),
    seconds: PropTypes.number, // Add the appropriate prop type
    setQuestionStatus: PropTypes.func.isRequired,
    answeredCount: PropTypes.number, // Add the appropriate prop type
    notAnsweredCount: PropTypes.number, // Add the appropriate prop type
    answeredmarkedForReviewCount: PropTypes.number, // Add the appropriate prop type
    markedForReviewCount: PropTypes.number, // Add the appropriate prop type
    VisitedCount: PropTypes.number, // Add the appropriate prop type
    selectedSubject: PropTypes.string, // Add the appropriate prop type
    updateButtonStatus: PropTypes.func, // Add the appropriate prop type
    data: PropTypes.object, // Add the appropriate prop type
    updateQuestionStatus: PropTypes.func.isRequired, // Add the prop type
  };

  const WformatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear the interval and handle time-up logic when timer reaches 0
    if (wtimer <= 0) {
      clearInterval(interval);
      // Handle time-up logic here (e.g., navigate to a different component)
    }

    // Clean up the interval on component unmount or when navigating away
    return () => {
      clearInterval(interval);
    };
  }, [wtimer]);

  //user name
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5001/ughomepage_banner_login/user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to headers for authentication
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          // console.log(userData);
        } else {
          // Handle errors, e.g., if user data fetch fails
        }
      } catch (error) {
        // Handle other errors
      }
    };

    fetchUserData();
  }, []);


  const [testName, setTestName] = useState('');
  const { testCreationTableId } = useParams();
  useEffect(() => {
    fetchTestName();
  }, [testCreationTableId]); // Re-fetch test name when testCreationTableId changes

  const fetchTestName = async () => {
    try {
      const response = await fetch(`http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`);
      const data = await response.json();
      const testName = data.questions[0].TestName;
      setTestName(testName);
    } catch (error) {
      console.error('Error fetching test name:', error);
    }
  };

  return (
    <>
      <div className="right-side-bar">
        <div className="rightSidebar-topHeader">
          <img
            title={userData.username}
            src={userData.imageData}
            alt={`Image ${userData.user_Id}`}
          />
          <p>Name of the person : {userData.username}</p>
          <p key={testName.testCreationTableId}>Test Name:{testName}</p>

          {/* <p>Time Left: {WformatTime(wtimer)}</p> */}
        </div>

        <div className="buttons_container">
          <div className="ques-btn">
            <ul className="btn-ul quesAns-btn">{renderQuestionButtons}</ul>
          </div>
        </div>

        <div className="sidebar-footer">
          <h4 className="sidebar-footer-header">Legend</h4>
          <div className="footer-btns">
            <div className="inst-btns">
              <button
                className="instruction-btn1 r_S_B_BTNS"
                title="answeredCount"
              >
                {answeredCount}
              </button>
              <span>Answerd</span>
            </div>
            <div className="inst-btns">
              <button
                className="instruction-btn2 r_S_B_BTNS"
                title="notAnsweredCount"
              >
                {notAnsweredCount}
              </button>
              <span>Not Answered</span>
            </div>
            <div className="inst-btns">
              <button
                className="instruction-btn3 r_S_B_BTNS"
                title="answeredmarkedForReviewCount"
              >
                {answeredmarkedForReviewCount}
              </button>
              <span>Marked</span>
            </div>
            <div className="inst-btns">
              <button
                className="instruction-btn4 r_S_B_BTNS"
                title="markedForReviewCount"
              >
                {markedForReviewCount}
              </button>
              <span>Answered but marked for review</span>
            </div>{" "}
            <div className="inst-btns">
              {" "}
              <button
                className="instruction-btn5 r_S_B_BTNS"
                title="VisitedCount"
              >
                   {NotVisited}
                {/* {VisitedCount} */}
              </button>
              <span>Not Visited


             
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonsFunctionality;
