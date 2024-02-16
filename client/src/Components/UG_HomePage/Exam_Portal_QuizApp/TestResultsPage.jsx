import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "./TestResultPage.css";

import axios from "axios";

const TestResultsPage = () => {
  const { testCreationTableId, user_Id, userId } = useParams();

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

  const [answer, setAnswer] = useState([]);

  console.log(userData.id);
  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const responseAnswer = await fetch(
          `http://localhost:5001/QuestionPaper/answer/${testCreationTableId}/${userData.id}`
        );
        const answerData = await responseAnswer.json();
        setAnswer(answerData);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

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

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          // Handle errors, e.g., if user data fetch fails
        }
      } catch (error) {
        // Handle other errors
      }
    };

    fetchAnswer();
    fetchUserData();
  }, [testCreationTableId, userData.id]); // Include dependencies in the dependency array
  // Include dependencies in the dependency array

  // const [answer, setAnswer] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const [questionStatus, setQuestionStatus] = useState([]);
  // const [selectedAnswers, setSelectedAnswers] = useState([]);
  // const { testCreationTableId } = useParams();
  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);

  const [questionCount, setQuestionCount] = useState(null);

  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/questionCount/${testCreationTableId}`
        ); // Replace "yourTestCreationTableId" with the actual testCreationTableId
        const data = await response.json();
        setQuestionCount(data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId]);

  const [attemptCount, setAttemptCount] = useState(null);
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/attemptCount/${testCreationTableId}/${userData.id}`
        );
        const data = await response.json();
        setAttemptCount(data);
        // console.log(setAttemptCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId, userData.id]);

  const [correctAnswers, setCorrectAnswersCount] = useState(null);
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5001/QuestionPaper/correctAnswers/${testCreationTableId}/${userData.id}`
          `http://localhost:5001/QuestionPaper/correctAnswers/${testCreationTableId}/${userData.id}`
        );
        const data = await response.json();
        setCorrectAnswersCount(data);
        // console.log(setAttemptCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };
    fetchQuestionCount();
  }, [testCreationTableId, user_Id]);

  const [incorrectAnswers, setIncorrectAnswersCount] = useState(null);
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/incorrectAnswers/${testCreationTableId}/${userData.id}`
        );
        const data = await response.json();
        setIncorrectAnswersCount(data);
        // console.log(setAttemptCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId, userData.id]);

  const [score, setScoreCount] = useState({ totalMarks: 0, netMarks: 0 });

  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/score/${testCreationTableId}/${userData.id}`
          // `http://localhost:5001/QuestionPaper/score/4/3`
        );
        const data = await response.json();
        setScoreCount(data);
        // console.log("score")
        // console.log(setScoreCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId, userData.id]);

  console.log(score);
  console.log("hiiiiiiiiiiiii");
  // console.log("subject:", score.subjectName);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5001/QuestionPaper/getEmployeeData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const employeeData = await response.json();
          console.log("Employee Data:", employeeData);
          // Set your state or perform other actions with the employeeData
        } else {
          console.error(
            "Unexpected response from server:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during request:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  // /getTimeLeftSubmissions/:userId/:testCreationTableId

  const [TimeSpent, setTimeSpent] = useState(null);
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/getTimeLeftSubmissions/${testCreationTableId}/${userData.id}`
          // `http://localhost:5001/QuestionPaper/score/${testCreationTableId}/${userData.id}`
          // `http://localhost:5001/QuestionPaper/getTimeLeftSubmissions/3/2`
        );
        const data = await response.json();
        setTimeSpent(data);

        // console.log(setAttemptCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId, userData.id]);

  console.log("hello");
  console.log("hello time", TimeSpent);

  const [userResponse, setUserResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/QuestionPaper/user_answer"
        );
        setUserResponse(response.data);
      } catch (error) {
        console.error("Error fetching user response:", error.message);
      }
    };

    fetchData();
  }, []);

  // Function to group sections by subject ID and combine scores of sections A and B
  const groupSectionsBySubjectId = () => {
    if (!score || !score.subjects) return [];

    const subjectScores = {}; // Object to store aggregated scores for each subject

    score.subjects.forEach((subject) => {
      if (!subjectScores[subject.subjectId]) {
        subjectScores[subject.subjectId] = {
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
          totalMarks: 0,
          netMarks: 0,
          correctAnswersCount: 0,
          sections: {}, // Object to store scores for each section
        };
      }

      subject.sections.forEach((section) => {
        // Accumulate scores for sections A and B
        subjectScores[subject.subjectId].totalMarks += parseFloat(
          section.scores.totalMarks
        );
        subjectScores[subject.subjectId].netMarks += parseFloat(
          section.scores.netMarks
        );
        subjectScores[subject.subjectId].correctAnswersCount += parseFloat(
          section.scores.correctAnswersCount
        );

        // Store section-wise scores within the subject object
        if (!subjectScores[subject.subjectId].sections[section.sectionName]) {
          subjectScores[subject.subjectId].sections[section.sectionName] = {
            totalMarks: 0,
            netMarks: 0,
          };
        }

        subjectScores[subject.subjectId].sections[
          section.sectionName
        ].totalMarks += parseFloat(section.scores.totalMarks);
        subjectScores[subject.subjectId].sections[
          section.sectionName
        ].netMarks += parseFloat(section.scores.netMarks);
      });
    });

    // Convert subjectScores object into an array of subject scores
    return Object.values(subjectScores);
  };

  // console.log("subject:",score.subjects.subjectName);

  return (
    <div className="testResult_-container">
      <h1>Scrore Card</h1>
      <div className="user_-infoFromResult">
        <div>
          <img
            title={userData.username}
            src={userData.imageData}
            alt={`Image ${userData.user_Id}`}
            style={{ borderRadius: "50%", width: "90px" }}
          />
        </div>
        <div>
          <p>id:{userData.id}</p>
          <p>Name: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      </div>

      <div className="testResultTable">
        <table id="customers">
          <tr>
            <td>
              Total Questions: <span></span>
            </td>
            <td>Total Attempted</td>
            <td>Correct Answers</td>
            <td>Incorrect Answers</td>
            <td>Score</td>
            <td>Time Spent</td>
          </tr>
          <tr>
            <td>
              {questionCount && questionCount.length > 0 ? (
                <p>{questionCount[0].total_question_count}</p>
              ) : (
                <span>Loading...</span>
              )}
            </td>
            <td>
              {" "}
              {attemptCount && attemptCount.length > 0 ? (
                <p>{attemptCount[0].total_attempted_questions}</p>
              ) : (
                <span>Loading...</span>
              )}
            </td>
            <td>
              {correctAnswers && correctAnswers.length > 0 ? (
                <p>{correctAnswers[0].total_matching_rows}</p>
              ) : (
                <span>Loading...</span>
              )}
            </td>
            <td>
              {" "}
              {incorrectAnswers && incorrectAnswers.length > 0 ? (
                <p>{incorrectAnswers[0].total_unmatched_rows}</p>
              ) : (
                <span>Loading...</span>
              )}
            </td>
            <td>{score.overallNetMarks}</td>
            {TimeSpent ? (
              TimeSpent.map((time, index) => {
                console.log("hiiiiiiiiiii");
                console.log("Time:", time); // Add this line for debugging
                return (
                  <tr key={index}>
                    <td>{time.time_left}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            )}
          </tr>
        </table>
      </div>
      <br />
      <div className="testResultTable">
        <table id="customers">
          <tr>
            <td>Question No.</td>
            <td>Selected Option</td>
            <td>Status</td>
            <td>Correct Option</td>
          </tr>
          {answer.map((answerData, index) => (
            <tr key={index}>
              <td>Question: {answerData.question_id}</td>
              <td>{answerData.trimmed_user_answer}</td>
              <td>{answerData.status}</td>
              <td>{answerData.answer_text}</td>
            </tr>
          ))}
        </table>
      </div>

      {/* main working code for subject wise score */}
      <div className="score_cards_div">
        <h3 className="Total_score">Total Score: {score.overallNetMarks}</h3>
        <div className="score_cards">
          {groupSectionsBySubjectId().map((subject) => (
            <div key={subject.subjectId} className="subject_score_card">
              <h4>{subject.subjectName}</h4>
              <p>Total Marks: {subject.netMarks}</p>
              <div>
                {Object.entries(subject.sections).map(
                  ([sectionName, sectionScores]) => (
                    <div key={sectionName}>
                      <p>{sectionName}</p>
                      <p>Marks: {sectionScores.netMarks}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* main working code for subject wise score */}
    </div>
  );
};

export default TestResultsPage;
