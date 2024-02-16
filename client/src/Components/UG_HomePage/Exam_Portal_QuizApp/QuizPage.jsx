import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonsFunctionality from "./ButtonsFunctionality";

import "./styles/Paper.css";

import logo from "./asserts/egradtutor_logo.png";
import { index } from "d3-array";
import { convertLength } from "@mui/material/styles/cssUtils";

const QuizPage = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault(); // Prevent default keyboard action
      event.stopPropagation(); // Stop event propagation
      // Optionally, you can add custom logic here to handle keydown events.
    };

    // Attach event listener to intercept keydown events
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // --------------------------------------CONST VARIABLES DECLARATIONS--------------------------
  const [questionData, setQuestionData] = useState({ questions: [] });
  const [value, setValue] = useState("");

  const { subjectId, testCreationTableId, userId, question_id, user_Id } =
    useParams();
  const [Subjects, setSubjects] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questionStatus, setQuestionStatus] = useState(
    Array.isArray(questionData)
      ? [
          Array(questionData.questions.length).fill("notAnswered")[0],
          ...Array(questionData.questions.length - 1).fill("notAnswered"),
        ]
      : []
  );

  const [sections, setSections] = useState([]);

  const vl = value;
  // console.log("calculator:", setValue)
  const navigate = useNavigate();
  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);
  const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
    useState(0);
  const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
  const [VisitedCount, setVisitedCount] = useState(0);
  const [NotVisited, setNotVisited] = useState(0);

  const [showExamSumary, setShowExamSumary] = useState(false);

  const [calculatorValue, setCalculatorValue] = useState("");

  const questions = questionData.questions ? questionData.questions.length : 0;
  const remainingQuestions =
    questions -
    VisitedCount -
    notAnsweredCount -
    answeredCount -
    markedForReviewCount -
    answeredmarkedForReviewCount;

  const NotVisitedb = remainingQuestions < 0 ? 0 : remainingQuestions;

  const calculateQuestionCounts = () => {
    let answered = 0;
    let notAnswered = 0;
    let markedForReview = 0;
    let answeredmarkedForReviewCount = 0;
    let VisitedCount = 0;
    let NotVisited = 0;
    questionStatus.forEach((status, index) => {
      if (status === "answered") {
        answered++;
      } else if (status === "notAnswered") {
        notAnswered++;
      } else if (status === "marked") {
        markedForReview++;
      } else if (status === "Answered but marked for review") {
        answeredmarkedForReviewCount++;
      } else if (status === "notVisited") {
        VisitedCount++;
      }
    });

    return {
      answered,
      notAnswered,
      markedForReview,
      answeredmarkedForReviewCount,
      VisitedCount,
    };
  };

  const updateCounters = () => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let markedForReview = 0;
    let Visited = 0;

    questionStatus.forEach((status) => {
      if (status === "answered") {
        answered++;
      } else if (status === "notAnswered") {
        notAnswered++;
      } else if (status === "marked") {
        marked++;
      } else if (status === "Answered but marked for review") {
        markedForReview++;
      } else if (status === "notVisited") {
        Visited++;
      }
    });

    setAnsweredCount(answered);
    setNotAnsweredCount(notAnswered);
    setAnsweredmarkedForReviewCount(marked);
    setMarkedForReviewCount(markedForReview);
    setVisitedCount(Visited);
  };

  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questionData.length).fill("")
  );

  // const handleQuestionSelect = (questionNumber) => {
  //    const updatedQuestionStatus = [...questionStatus];
  //   setCurrentQuestionIndex(questionNumber - 1);
  //   updatedQuestionStatus[currentQuestionIndex] = "answered";
  //   setActiveQuestion(questionNumber - 1);
  // };
  const handleQuestionSelect = (questionNumber) => {
    const updatedQuestionStatus = [...questionStatus];
    const updatedIndex = questionNumber - 1; // Calculate the updated index

    setCurrentQuestionIndex(updatedIndex); // Update the current question index
    updatedQuestionStatus[updatedIndex] = "notAnswered"; // Update the question status at the updated index
    setActiveQuestion(updatedIndex); // Set the active question to the updated index
  };

  const [clickCount, setClickCount] = useState(0);

  const [answeredQuestionsMap, setAnsweredQuestionsMap] = useState({});

  const [selectedAnswersMap1, setSelectedAnswersMap1] = useState({});
  const [selectedAnswersMap2, setSelectedAnswersMap2] = useState({});
  const [selectedAnswersMap3, setSelectedAnswersMap3] = useState({});

  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  // const [showExamSumary, setShowExamSumary] = useState(false);
  const calculateResult = () => {};

  const handleYes = async () => {
    const userId = userData.id;

    // console.log(userId);
    navigate(`/TestResultsPage/${testCreationTableId}`);
  };

  const handleNo = () => {
    setShowExamSumary(false);
  };

  const [activeQuestion, setActiveQuestion] = useState(0);
  // --------------------------------------END OF CONST VARIABLES DECLARATIONS--------------------------

  // ------------------------------------------TIMER FUNCTION------------------------
  const [timer, setTimer] = useState(0);
  // const [timers, setTimers] = useState(Array(questionData));
  const [timers, setTimers] = useState(
    Array(questionData.questions.length).fill(0)
  );

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
  };

  useEffect(() => {
    setTimer(timers[currentQuestionIndex] || 0);
    let interval;
    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentQuestionIndex, timers]);

  // ------------------------------------------END OF TIMER FUNCTION------------------------
  const [timeLeftAtSubmission, setTimeLeftAtSubmission] = useState(0);

  // -------------------------overall time-------------------------------
  const [wtimer, setWTimer] = useState(0);
  const WformatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
    // return hours * 3600 + minutes * 60 + seconds;
  };
  useEffect(() => {
    // setWTimer(wtimer);
    let interval;
    interval = setInterval(() => {
      setWTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [wtimer]);

  // const correctOptionId = questionData.questions[currentQuestionIndex].correct_option_id;
  // console.log('correctOptionId',correctOptionId)

  // main
  const onAnswerSelected1 = (optionIndex) => {
    const questionId = questionData.questions[currentQuestionIndex].question_id;
    const charcodeatopt = String.fromCharCode("a".charCodeAt(0) + optionIndex);

    // console.log("questionId from onAnswerSelected1 : ", questionId);
    const questionIndex = currentQuestionIndex + 1;
    // console.log(`Question Index: ${questionIndex}`);
    // console.log(`Clicked Option Index: ${charcodeatopt}`);
    console.log("Selected option index:", optionIndex);

    const selectedOption =
      questionData.questions[currentQuestionIndex].options[optionIndex];
    // Retrieve the option ID
    const optionId = selectedOption.option_id;

    // Log the selected option index ID and option ID
    console.log("Selected option index:", optionIndex);
    console.log("Selected option ID:", optionId);

    // setSelectedAnswersMap1((prevMap) => ({
    //   ...prevMap,
    //   [questionId]: optionIndex,
    // }));

    setSelectedAnswersMap1((prevMap) => ({
      ...prevMap,
      [currentQuestion.question_id]: optionIndex,
    }));

    // setSelectedAnswersMap1({
    //     ...selectedAnswersMap1,
    //     [currentQuestion.question_id]: optionIndex,
    //   });
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = optionIndex;
    setSelectedAnswers(updatedSelectedAnswers);
    // console.log(
    //   "questionId from updatedSelectedAnswers : ",
    //   updatedSelectedAnswers
    // );
  };
  const onAnswerSelected2 = (optionIndex) => {
    const questionId = questionData.questions[currentQuestionIndex].question_id;
    const charcodeatopt = String.fromCharCode("a".charCodeAt(0) + optionIndex);

    // Retrieve the existing selected options for the current question
    const existingSelection = selectedAnswersMap2[questionId] || [];

    // Check if the selected option is already in the existing selection
    const isSelected = existingSelection.includes(optionIndex);

    // Update the selection based on whether the option was already selected or not
    const updatedSelection = isSelected
      ? existingSelection.filter((index) => index !== optionIndex) // Deselect the option if already selected
      : [...existingSelection, optionIndex]; // Select the option if not already selected

    // Update the selected answers map with the updated selection for the current question
    setSelectedAnswersMap2((prevMap) => ({
      ...prevMap,
      [questionId]: updatedSelection,
    }));

    // Update the selected answers array for the active question
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = updatedSelection;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const onAnswerSelected3 = (e) => {
    const inputValue = e.target.value;
    const parsedValue = parseFloat(inputValue);

    // Set the value state
    setValue(parsedValue);

    if (
      !questionData.questions ||
      !questionData.questions[currentQuestionIndex]
    ) {
      console.error("Invalid question data or index");
      return;
    }

    const currentQuestion = questionData.questions[currentQuestionIndex];
    const questionId = currentQuestion.question_id;

    // Extract the answerNumber from the current question
    const answerNumber = currentQuestion.answerNumber;

    // Update the selected answers map with the answer value
    setSelectedAnswersMap3((prevMap) => ({
      ...prevMap,
      [questionId]: answerNumber,
    }));

    // Directly set the value attribute of the input field
    const inputField = document.getElementById(
      `question-${currentQuestionIndex}`
    );
    if (inputField) {
      inputField.value = answerNumber ? answerNumber.toString() : ""; // Set the value if answerNumber is not null
    }

    console.log("Calculator Value:", parsedValue);
    console.log("Calculator Input Text Box Value:", inputValue);
    console.log("Answer Number:", answerNumber);

    // Update the question status based on the answer
    const updatedQuestionStatus = [...questionStatus];
    updatedQuestionStatus[currentQuestionIndex] = "answered";
    setQuestionStatus(updatedQuestionStatus);
  };

  //end Subjects fetching use effect code

  //users fetching use effect code
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
  //end users fetching use effect code

  //counts use effect code
  useEffect(() => {
    const counts = calculateQuestionCounts();
    setAnsweredCount(counts.answered);
    setNotAnsweredCount(counts.notAnswered);
    setMarkedForReviewCount(counts.markedForReview);
    setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
    setVisitedCount(counts.VisitedCount);
  }, [questionStatus]);

  useEffect(() => {
    // Check if testCreationTableId is defined before making the request
    if (testCreationTableId) {
      fetchData();
    }
  }, [testCreationTableId]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setQuestionData(data);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const currentQuestion =
    questionData.questions && questionData.questions[currentQuestionIndex];

  const [userData, setUserData] = useState({});
  // user data
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

  const [originalStatuses, setOriginalStatuses] = useState(
    Array(questionData.questions.length).fill("notVisited")
  );

  useEffect(() => {
    // Call the updateCounters function initially when the component mounts
    updateCounters();
  }, [questionStatus]);

  // Reset calculator value when the question changes
  useEffect(() => {
    if (
      !questionData.questions ||
      !questionData.questions[currentQuestionIndex]
    ) {
      // Handle the case where questions are not defined
      return;
    }

    const questionId = questionData.questions[currentQuestionIndex].question_id;

    // Retrieve the stored value from local storage when the component mounts
    const storedValue = localStorage.getItem(`calculatorValue_${questionId}`);
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue).value;
      setValue(parsedValue);
      // console.log("Stored Value:", parsedValue);
    } else {
      setValue(""); // Clear the input if there is no stored value
      // console.log("No stored value found.");
    }
  }, [currentQuestionIndex, questionData]);

  const [responseCleared, setResponseCleared] = useState(false);
  //main working
  const handleSaveNextQuestion = async () => {
    try {
      const updatedQuestionStatus = [...questionStatus];
      const calculatorInputValue = value;

      console.log("Current Question Index:", currentQuestionIndex);
      console.log("Current Question:", currentQuestion);

      const isCurrentQuestionAnswered =
        selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
        (selectedAnswersMap2[currentQuestion.question_id] &&
          selectedAnswersMap2[currentQuestion.question_id].length > 0) ||
        calculatorInputValue !== "";

      console.log("Is Current Question Answered:", isCurrentQuestionAnswered);

      if (!isCurrentQuestionAnswered) {
        window.alert("Please answer the question before proceeding.");
      } else {
        updatedQuestionStatus[currentQuestionIndex] = "answered";
        setQuestionStatus(updatedQuestionStatus);

        setCurrentQuestionIndex((prevIndex) =>
          prevIndex < questionData.questions.length - 1
            ? prevIndex + 1
            : prevIndex
        );

        if (userData.id) {
          const userId = userData.id;
          const subjectId = currentQuestion.subjectId;
          const sectionId = currentQuestion.sectionId;
          const questionId = currentQuestion.question_id.toString();

          const valueObject = {
            testCreationTableId: testCreationTableId,
            value: calculatorInputValue,
            question_id: questionId,
          };

          // Store the calculator value in local storage
          localStorage.setItem(
            `calculatorValue_${questionId}`,
            JSON.stringify(valueObject)
          );

          // Introduce a small delay before retrieving the stored value
          // This ensures that the local storage has enough time to update
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Retrieve the stored calculator value
          const storedValue = localStorage.getItem(
            `calculatorValue_${questionId}`
          );
          const storedCalculatorInputValue = storedValue
            ? JSON.parse(storedValue).value
            : null;

          if (calculatorInputValue === storedCalculatorInputValue) {
            const selectedOption1 =
              selectedAnswersMap1[currentQuestion.question_id];

            const selectedOption2 =
              selectedAnswersMap2[currentQuestion.question_id];

            const optionIndexes1 =
              selectedOption1 !== undefined ? [selectedOption1] : [];
            const optionIndexes2 =
              selectedOption2 !== undefined ? selectedOption2 : [];

            const hasAnswered = answeredQuestionsMap[questionId];

            const responses = {
              questionId: questionId,
              hasAnswered: hasAnswered,
              userId: userId,
              testCreationTableId: testCreationTableId,
              subjectId: subjectId,
              sectionId: sectionId,
              [questionId]: {
                optionIndexes1: optionIndexes1.map((index) => {
                  const selectedOption =
                    questionData.questions[currentQuestionIndex].options[index];
                  return selectedOption.option_id;
                }),
                optionIndexes1CharCodes: optionIndexes1.map((index) => {
                  return String.fromCharCode("a".charCodeAt(0) + index);
                }),
                optionIndexes2: optionIndexes2.map((index) => {
                  const selectedOption =
                    questionData.questions[currentQuestionIndex].options[index];
                  return selectedOption.option_id;
                }),
                optionIndexes2CharCodes: optionIndexes2.map((index) => {
                  return String.fromCharCode("a".charCodeAt(0) + index);
                }),
                calculatorInputValue: calculatorInputValue,
              },
            };

            setAnsweredQuestionsMap((prevMap) => ({
              ...prevMap,
              [questionId]: true,
            }));
            // Check if the response is cleared for the current question

            if (hasAnswered) {
              // If the question has been answered before, update the existing response with a PUT request
              console.log(
                "Making API request to update the existing response..."
              );

              const updatedResponse = {
                optionIndexes1: optionIndexes1.map((index) =>
                  String.fromCharCode("a".charCodeAt(0) + index)
                ),
                optionIndexes2: optionIndexes2.map((index) =>
                  String.fromCharCode("a".charCodeAt(0) + index)
                ),
                calculatorInputValue: calculatorInputValue,
              };

              await fetch(
                `http://localhost:5001/QuestionPaper/updateResponse/${questionId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    updatedResponse,
                    userId,
                    testCreationTableId,
                    subjectId,
                    sectionId,
                  }),
                }
              );

              console.log("Handling the response after updating...");
            } else {
              // If the question is being answered for the first time, save a new response with a POST request
              console.log("Making API request to save a new response...");

              await fetch("http://localhost:5001/QuestionPaper/response", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(responses),
              });

              console.log("Handling the response after saving...");
            }
          }
        }
      }
    } catch (error) {
      console.error("Error handling next click:", error);
    }
  };

  const handleNextQuestion = async () => {
    try {
      const currentQuestion = questionData.questions[currentQuestionIndex];

      // Check if the current question is answered
      const calculatorInputValue = value;
      const isCurrentQuestionAnswered =
        selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
        (selectedAnswersMap2[currentQuestion.question_id] &&
          selectedAnswersMap2[currentQuestion.question_id].length > 0) ||
        calculatorInputValue !== "";

      if (!isCurrentQuestionAnswered) {
        // If the current question is not answered, update the status
        const updatedQuestionStatus = [...questionStatus];
        updatedQuestionStatus[currentQuestionIndex] = "notAnswered";
        setQuestionStatus(updatedQuestionStatus);

        // You may also show a message or perform other actions to indicate that the question is not answered
        console.log("Question not answered!");
      } else {
        // Log a message indicating that the question is answered
        console.log("Question answered!");
      }

      // Move to the next question index
      setCurrentQuestionIndex((prevIndex) =>
        prevIndex < questionData.questions.length - 1
          ? prevIndex + 1
          : prevIndex
      );

      // Fetch the next set of questions
      // const response = await fetch(
      //   `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
      // );
      // const result = await response.json();
      // setQuestionData(result);

      // Fetch user data using the token
      const token = localStorage.getItem("token");
      const response_user = await fetch(
        "http://localhost:5001/ughomepage_banner_login/user",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to headers for authentication
          },
        }
      );

      if (response_user.ok) {
        const userData = await response_user.json();
        setUserData(userData);

        // Ensure userId is defined
        const userId = userData.id;

        // Log relevant information
        console.log("Test Creation Table ID:", testCreationTableId);
        console.log("Current user_Id:", userId);

        // Ensure questionData is not null or undefined
        if (!questionData || !questionData.questions) {
          console.error("Data or questions are null or undefined");
          return;
        }

        // Extract information for the current question
        const currentQuestion = questionData.questions[currentQuestionIndex];
        const selectedOption1 =
          selectedAnswersMap1[currentQuestion.question_id];
        const selectedOption2 =
          selectedAnswersMap2[currentQuestion.question_id];

        // Map selected options to indexes
        const optionIndexes1 =
          selectedOption1 !== undefined ? [selectedOption1] : [];
        const optionIndexes2 =
          selectedOption2 !== undefined ? selectedOption2 : [];

        // Prepare data to be sent in the response
        const questionId = currentQuestion.question_id;
        const responses = {
          userId: userId,
          testCreationTableId: testCreationTableId,
          [questionId]: {
            optionIndexes1: optionIndexes1.map((index) =>
              String.fromCharCode("a".charCodeAt(0) + index)
            ),
            optionIndexes2: optionIndexes2.map((index) =>
              String.fromCharCode("a".charCodeAt(0) + index)
            ),
          },
        };

        // Save the response to the server
        const saveResponse = await axios.post(
          "http://localhost:5001/QuestionPaper/response",
          { responses }
        );

        // Log the response and update state
        console.log(saveResponse.data);
        console.log("Handle Next Click - New Response Saved");

        setAnsweredQuestionsMap((prevMap) => ({
          ...prevMap,
          [questionId]: true,
        }));

        setClickCount((prevCount) => prevCount + 1);
      } else {
        // Handle errors, e.g., if user data fetch fails
        console.error("Error fetching user data");
      }

      // Check if there are more questions, and if not, calculate the result
      if (currentQuestionIndex === questionData.questions.length - 1) {
        // setShowResult(true);
        calculateResult();
      }
    } catch (error) {
      console.error("Error handling next click:", error);
    }
  };

  const markForReview = async () => {
    try {
      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex < questionData.questions.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex;
      });

      const calculatorInputValue = value;
      const currentQuestion = questionData.questions[currentQuestionIndex];
      const isCurrentQuestionAnswered =
        selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
        (selectedAnswersMap2[currentQuestion.question_id] &&
          selectedAnswersMap2[currentQuestion.question_id].length > 0) ||
        calculatorInputValue !== "";

      const updatedQuestionStatus = [...questionStatus];
      if (isCurrentQuestionAnswered) {
        // If the question is answered
        updatedQuestionStatus[currentQuestionIndex] =
          "Answered but marked for review";

        if (userData.id) {
          const userId = userData.id;
          const subjectId = currentQuestion.subjectId;
          const sectionId = currentQuestion.sectionId;
          const questionId = currentQuestion.question_id.toString();

          // Store the calculator value in local storage
          localStorage.setItem(
            `calculatorValue_${questionId}`,
            JSON.stringify({ value: calculatorInputValue })
          );

          // Introduce a small delay before retrieving the stored value
          // This ensures that the local storage has enough time to update
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Retrieve the stored calculator value
          const storedValue = localStorage.getItem(
            `calculatorValue_${questionId}`
          );
          const storedCalculatorInputValue = storedValue
            ? JSON.parse(storedValue).value
            : null;

          if (calculatorInputValue === storedCalculatorInputValue) {
            const selectedOption1 =
              selectedAnswersMap1[currentQuestion.question_id];
            const selectedOption2 =
              selectedAnswersMap2[currentQuestion.question_id];

            const optionIndexes1 =
              selectedOption1 !== undefined ? [selectedOption1] : [];
            const optionIndexes2 =
              selectedOption2 !== undefined ? selectedOption2 : [];

            const hasAnswered = answeredQuestionsMap[questionId];

            // Construct the responses object
            const responses = {
              questionId: questionId,
              hasAnswered: hasAnswered,
              userId: userId,
              testCreationTableId: testCreationTableId,
              subjectId: subjectId,
              sectionId: sectionId,
              [questionId]: {
                optionIndexes1: optionIndexes1.map((index) => {
                  const selectedOption =
                    questionData.questions[currentQuestionIndex].options[index];
                  return selectedOption.option_id;
                }),
                optionIndexes1CharCodes: optionIndexes1.map((index) => {
                  return String.fromCharCode("a".charCodeAt(0) + index);
                }),
                optionIndexes2: optionIndexes2.map((index) => {
                  const selectedOption =
                    questionData.questions[currentQuestionIndex].options[index];
                  return selectedOption.option_id;
                }),
                optionIndexes2CharCodes: optionIndexes2.map((index) => {
                  return String.fromCharCode("a".charCodeAt(0) + index);
                }),

                calculatorInputValue: calculatorInputValue,
              },
            };

            // Mark the question as answered
            setAnsweredQuestionsMap((prevMap) => ({
              ...prevMap,
              [questionId]: true,
            }));

            // Check if the question has been answered before
            if (hasAnswered) {
              // If the question has been answered before, update the existing response with a PUT request
              console.log(
                "Making API request to update the existing response..."
              );

              const updatedResponse = {
                optionIndexes1: optionIndexes1.map((index) =>
                  String.fromCharCode("a".charCodeAt(0) + index)
                ),
                optionIndexes2: optionIndexes2.map((index) =>
                  String.fromCharCode("a".charCodeAt(0) + index)
                ),
                calculatorInputValue: calculatorInputValue,
              };

              await fetch(
                `http://localhost:5001/QuestionPaper/updateResponse/${questionId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    updatedResponse,
                    userId,
                    testCreationTableId,
                    subjectId,
                    sectionId,
                  }),
                }
              );

              console.log("Handling the response after updating...");
            } else {
              // If the question is being answered for the first time, save a new response with a POST request
              console.log("Making API request to save a new response...");

              await fetch("http://localhost:5001/QuestionPaper/response", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(responses),
              });

              console.log("Handling the response after saving...");
            }
          }
        }
      } else {
        // If the question is not answered
        updatedQuestionStatus[currentQuestionIndex] = "marked";
      }

      setQuestionStatus(updatedQuestionStatus);
    } catch (error) {
      console.error("Error handling mark for review:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      window.alert(
        "Your Test has been Submitted!! Click Ok to See Result.",
        calculateResult()
      );
      setShowExamSumary(true);
      calculateResult();
      const counts = calculateQuestionCounts();
      setAnsweredCount(counts.answered);
      setNotAnsweredCount(counts.notAnswered);
      setMarkedForReviewCount(counts.markedForReview);
      setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
      setVisitedCount(counts.VisitedCount);

      // Assuming you have these variables in your component's state
      const currentQuestion = questionData.questions[currentQuestionIndex];
      const questionId = currentQuestion.question_id;

      // Format time
      const formattedTime = WformatTime(wtimer);

      try {
        // Make a POST request to your server to submit time left
        const response = await fetch(
          "http://localhost:5001/QuestionPaper/submitTimeLeft",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userData.id,
              testCreationTableId: testCreationTableId,
              timeLeft: formattedTime,
            }),
          }
        );

        const result = await response.json();
        console.log("Time left submission result:", result);
      } catch (error) {
        console.error("Error submitting time left:", error);
      } finally {
        // Ensure that the questionId is correctly obtained
        if (questionId) {
          // Clear local storage data for the current question
          try {
            console.log(
              "Removing from local storage for questionId:",
              questionId
            );
            localStorage.removeItem(`calculatorValue_${questionId}`);
            console.log("Item removed successfully.");
          } catch (error) {
            console.error("Error removing item from local storage:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handlePreviousClick = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // Save the current timer value for the question
      const updatedTimers = [...timers];
      updatedTimers[prevIndex] = timer;
      setTimers(updatedTimers);
      // Move to the previous question
      return prevIndex - 1;
    });

    fetchData();
    console.log("fetchDataf", fetchData());
    setActiveQuestion((prevActiveQuestion) => prevActiveQuestion - 1);
    // Set the value to the previously selected answer if available
    if (currentQuestionIndex > 0) {
      const prevQuestion = questionData.questions[currentQuestionIndex - 1];
      const prevQuestionId = prevQuestion.question_id;

      // Retrieve the stored answer from local storage using the question ID
      const value = localStorage.getItem(`calculatorValue_${prevQuestionId}`);
      if (value) {
        const parsedValue = JSON.parse(value).value;
        setValue(parsedValue);
        // console.log(
        //   "Stored Value for previous question:",
        //   prevQuestionId,
        //   parsedValue
        // );
      } else {
        // setValue(""); // Clear the input if there is no stored answer
        // console.log("No stored value found for previous question.");
      }
    }
  };
  const clearResponse = async () => {
    //-----------------buttons functionality--------------
    const currentQuestion = questionData.questions[currentQuestionIndex];
    const calculatorInputValue = value;
    const isCurrentQuestionAnswered =
      selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
      (selectedAnswersMap2[currentQuestion.question_id] &&
        selectedAnswersMap2[currentQuestion.question_id].length > 0) ||
      calculatorInputValue !== "";

    fetchData();
    if (isCurrentQuestionAnswered) {
      // If the current question is answered, update the status
      const updatedQuestionStatus = [...questionStatus];
      updatedQuestionStatus[currentQuestionIndex] = "notAnswered";
      setQuestionStatus(updatedQuestionStatus);
    }
    //-----------------buttons functionality end--------------

    try {
      const questionId =
        questionData.questions[currentQuestionIndex].question_id;

      // Clear response for radio buttons (MCQ)
      const updatedSelectedAnswersMap1 = { ...selectedAnswersMap1 };
      updatedSelectedAnswersMap1[questionId] = undefined;
      setSelectedAnswersMap1(updatedSelectedAnswersMap1);

      // Clear response for checkboxes (MSQ)
      const updatedSelectedAnswersMap2 = { ...selectedAnswersMap2 };
      updatedSelectedAnswersMap2[questionId] = [];
      setSelectedAnswersMap2(updatedSelectedAnswersMap2);

      // Clear response for input field
      const updatedSelectedAnswersMap3 = { ...selectedAnswersMap3 };
      updatedSelectedAnswersMap3[questionId] = undefined;
      setSelectedAnswersMap3(updatedSelectedAnswersMap3);

      // Remove the stored calculator value in local storage
      localStorage.removeItem(`calculatorValue_${questionId}`);

      // Send a request to your server to clear the user's response for the current question
      const response = await axios.delete(
        `http://localhost:5001/QuestionPaper/clearResponse/${questionId}`
      );

      if (response.status === 200) {
        console.log("Response cleared successfully");
        // Update any state or perform additional actions as needed
      } else {
        console.error("Failed to clear response:", response.data);
      }
    } catch (error) {
      console.error("Error clearing response:", error);
    }
  };

  const updateQuestionStatus = (index, status) => {
    // Update the question status in the QuestionPaper component
    const updatedQuestionStatus = [...questionStatus];
    updatedQuestionStatus[index] = status;
    setQuestionStatus(updatedQuestionStatus);
  };

  // State variable to store text answers for each question
  const [selectedTextAnswersMap3, setSelectedTextAnswersMap3] = useState({});
  const [textInputs, setTextInputs] = useState({});
  // Update function
  const onTextAnswerSelected = (questionId, answer) => {
    setSelectedTextAnswersMap3((prevMap) => ({
      ...prevMap,
      [questionId]: answer,
    }));
  };

  // Function to get the answer for the current question
  function getAnswerForCurrentQuestion() {
    const currentQuestion = questionData.questions[currentQuestionIndex];

    if (currentQuestion && currentQuestion.useranswer) {
      const { useranswer, typeofQuestion } = currentQuestion;

      // Check if typeofQuestion is defined before using includes
      if (typeofQuestion && typeofQuestion.includes) {
        // Adjust the logic based on your data structure
        if (typeofQuestion.includes("NATD")) {
          return useranswer.ans; // For questions with Decimal values
        } else if (typeofQuestion.includes("NATI")) {
          return useranswer.ans; // For questions with Integer values
        }
      }
    }

    // Add more conditions or handle the case where the question type is not recognized
    return "Answer not available";
  }

  const currentQuestionType =
    currentQuestion && currentQuestion.quesion_type
      ? currentQuestion.quesion_type.typeofQuestion
      : "";

  // console.log("Current Question Type:", currentQuestionType);

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
    <div className="QuestionPaper_-container">
      <div className="quiz_exam_interface_header">
        <div className="quiz_exam_interface_header_LOGO">
          <img src={logo} alt="" />
          {testData.map((test) => (
            <div className="test-card" key={test.testCreationTableId}>
              <li>
                <p className="test-card-header">
                  <h3>{test.TestName}</h3>
                </p>
              </li>
            </div>
          ))}
        </div>
      </div>

      {!showExamSumary ? (
        <div className="quiz_exam_interface_body">
          {/* --------------- quiz examconatiner -------------------- */}
          <div className="quiz_exam_interface_body_left_container">
            {/* --------------- quiz sub container -------------------- */}

            <div class="quiz_exam_interface_SUBJECTS_CONTAINER">
              <div>
                <div class="subjects_BTN_container">
                  <li>
                    <h6>Time Left: {WformatTime(wtimer)}</h6>
                  </li>
                </div>
              </div>

              <div class="right-header"></div>
            </div>

            {/* --------------- quiz question container -------------------- */}
            <div class="quiz_exam_interface_exam_CONTAINEr">
              {questionData.questions.length > 0 && (
                <>
                  <div className="quiz_exam_interface_exam_subCONTAINEr">
                    <div className="quiz_exam_interface_exam_qN_Q">
                      <div>
                        Question Type:
                        {currentQuestion.quesion_type && (
                          <p>{currentQuestion.quesion_type.typeofQuestion}</p>
                        )}
                      </div>
                      {/* <h3>Question:{currentQuestion.sortid.sortid_text}</h3> */}
                      <h3>{currentQuestionIndex + 1}</h3>

                      {currentQuestion.paragraph &&
                        currentQuestion.paragraph.paragraphImg && (
                          <>
                            <h2>Paragraph:</h2>
                            <img
                              src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${currentQuestion.paragraph.paragraphImg}`}
                              alt={`ParagraphImage ${currentQuestion.paragraph.paragraph_Id}`}
                              style={{ width: "700px" }}
                            />
                            <h2>Question: </h2>
                          </>
                        )}

                      <img
                        src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${currentQuestion.questionImgName}`}
                        alt={`Question ${currentQuestion.question_id}`}
                        style={{ width: "583px" }}
                      />
                      {/* <h1> {currentQuestion.question_id}</h1> */}
                    </div>

                    <div>
                      <div className="quiz_exam_interface_exam_qN_Q_options">
                        {/* <h3>Options:</h3> */}
                        {currentQuestionType &&
                          currentQuestionType.typeofQuestion &&
                          !currentQuestionType.typeofQuestion.includes(
                            "NATD"
                          ) &&
                          !currentQuestionType.typeofQuestion.includes(
                            "NATI"
                          ) && <h3>Options:</h3>}

                        {currentQuestion.options &&
                          Array.isArray(currentQuestion.options) &&
                          currentQuestion.options.filter(
                            (opt) =>
                              opt.question_id ===
                              questionData.questions[currentQuestionIndex]
                                ?.question_id
                          ) &&
                          currentQuestion.options.map((option, optionIndex) => (
                            <div className="option" key={option.option_id}>
                              <li key={optionIndex}>
                                {currentQuestionType.includes(
                                  "MCQ4(MCQ with 4 Options)"
                                ) && (
                                  <div>
                                    {/* <p>{option.ans} {optionIndex}</p> */}
                                    <input
                                      className="opt_btns"
                                      type="radio"
                                      name={`question-${currentQuestionIndex}-option`}
                                      value={option.ans}
                                      checked={
                                        selectedAnswersMap1[
                                          currentQuestion.question_id
                                        ] === optionIndex
                                      }
                                      onChange={() =>
                                        onAnswerSelected1(optionIndex)
                                      }
                                    />
                                    <label htmlFor="">
                                      ({option.option_index})
                                    </label>
                                    <img
                                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
                                      alt={`Option ${option.option_id}`}
                                    />
                                  </div>
                                )}
                                {currentQuestionType.includes(
                                  "MCQ5(MCQ with 5 Options)"
                                ) && (
                                  <div>
                                    <input
                                      className="opt_btns"
                                      type="radio"
                                      name={`question-${currentQuestionIndex}-option`}
                                      value={String.fromCharCode(
                                        "A".charCodeAt(0) + optionIndex
                                      )}
                                      checked={
                                        selectedAnswersMap1[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ] === optionIndex
                                      }
                                      onChange={() =>
                                        onAnswerSelected1(optionIndex)
                                      }
                                    />
                                    (
                                    {String.fromCharCode(
                                      "a".charCodeAt(0) + optionIndex
                                    )}
                                    )
                                    <img
                                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
                                      alt={`Option ${option.option_id}`}
                                    />
                                  </div>
                                )}
                                {currentQuestionType.includes(
                                  "MSQN(MSQ with -ve marking)"
                                ) && (
                                  <div>
                                    <input
                                      className="opt_btns"
                                      type="checkbox"
                                      name={`question-${currentQuestionIndex}-optionIndex`}
                                      value={String.fromCharCode(
                                        "A".charCodeAt(0) + optionIndex
                                      )}
                                      checked={
                                        selectedAnswersMap2[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ] &&
                                        selectedAnswersMap2[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ].includes(optionIndex)
                                      }
                                      onChange={() =>
                                        onAnswerSelected2(optionIndex)
                                      }
                                    />
                                    (
                                    {String.fromCharCode(
                                      "a".charCodeAt(0) + optionIndex
                                    )}
                                    )
                                    <img
                                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
                                      alt={`Option ${option.option_id}`}
                                    />
                                  </div>
                                )}
                                {currentQuestionType.includes(
                                  "MSQ(MSQ without -ve marking)"
                                ) && (
                                  <div>
                                    <input
                                      className="opt_btns"
                                      type="checkbox"
                                      name={`question-${currentQuestionIndex}-optionIndex`}
                                      value={String.fromCharCode(
                                        "A".charCodeAt(0) + optionIndex
                                      )}
                                      checked={
                                        selectedAnswersMap2[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ] &&
                                        selectedAnswersMap2[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ].includes(optionIndex)
                                      }
                                      onChange={() =>
                                        onAnswerSelected2(optionIndex)
                                      }
                                    />
                                    (
                                    {String.fromCharCode(
                                      "a".charCodeAt(0) + optionIndex
                                    )}
                                    )
                                    <img
                                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
                                      alt={`Option ${option.option_id}`}
                                    />{" "}
                                  </div>
                                )}
                                {/* calculator ============ */}
                                {currentQuestionType.includes(
                                  "NATD( Numeric Answer type of questions with Decimal values)"
                                ) && (
                                  <div className="calculator">
                                    <div className="display">
                                      <label>Answer:</label>
                                      <input
                                        type="text"
                                        name={`question-${currentQuestionIndex}`}
                                        value={value}
                                        onChange={(e) => onAnswerSelected3(e)}
                                        placeholder="Enter your answer"
                                        readOnly
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="AC"
                                        onClick={(e) => setValue("")}
                                      />
                                      <input
                                        type="button"
                                        value="DE"
                                        onClick={(e) =>
                                          setValue(value.slice(0, -1))
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="."
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="/"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="7"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="8"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="9"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="*"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="4"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="5"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="6"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="+"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="1"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="2"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="3"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="-"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="00"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="0"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="="
                                        className="equal"
                                        onClick={(e) => setValue(eval(value))}
                                      />
                                    </div>
                                  </div>
                                )}
                                {currentQuestionType.includes(
                                  "NATI( Numeric Answer type of questions with integer values)"
                                ) && (
                                  <div className="calculator">
                                    <div className="display">
                                      <label>Answer:</label>
                                      <input
                                        type="text"
                                        name={`question-${currentQuestionIndex}`}
                                        value={value}
                                        onChange={(e) => onAnswerSelected3(e)}
                                        placeholder="Enter your answer"
                                        readOnly
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="AC"
                                        onClick={(e) => setValue("")}
                                      />
                                      <input
                                        type="button"
                                        value="DE"
                                        onClick={(e) =>
                                          setValue(value.slice(0, -1))
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="."
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="/"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="7"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="8"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="9"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="*"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="4"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="5"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="6"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="+"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="1"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="2"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="3"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="-"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="button"
                                        value="00"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="0"
                                        onClick={(e) =>
                                          setValue(value + e.target.value)
                                        }
                                      />
                                      <input
                                        type="button"
                                        value="="
                                        className="equal"
                                        onClick={(e) => setValue(eval(value))}
                                      />
                                    </div>
                                  </div>
                                )}
                                {/* calculator ============ */}
                                {currentQuestionType.includes(
                                  "TF(True or false)"
                                ) && (
                                  <div>
                                    <input
                                      className="opt_btns"
                                      type="radio"
                                      name={`question-${currentQuestionIndex}-option`}
                                      value={String.fromCharCode(
                                        "A".charCodeAt(0) + optionIndex
                                      )}
                                      checked={
                                        selectedAnswersMap1[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ] === optionIndex
                                      }
                                      onChange={() =>
                                        onAnswerSelected1(optionIndex)
                                      }
                                    />
                                    (
                                    {String.fromCharCode(
                                      "a".charCodeAt(0) + optionIndex
                                    )}
                                    )
                                    <img
                                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
                                      alt={`Option ${option.option_id}`}
                                    />
                                  </div>
                                )}

                                {currentQuestionType.includes(
                                  "CTQ(Comprehension type of questions )"
                                ) && (
                                  <div>
                                    <input
                                      className="opt_btns"
                                      type="radio"
                                      name={`question-${currentQuestionIndex}-option`}
                                      value={String.fromCharCode(
                                        "A".charCodeAt(0) + optionIndex
                                      )}
                                      checked={
                                        selectedAnswersMap1[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ] === optionIndex
                                      }
                                      onChange={() =>
                                        onAnswerSelected1(optionIndex)
                                      }
                                    />
                                    (
                                    {String.fromCharCode(
                                      "a".charCodeAt(0) + optionIndex
                                    )}
                                    )
                                    <img
                                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
                                      alt={`Option ${option.option_id}`}
                                    />
                                  </div>
                                )}
                              </li>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="quiz_btns_contaioner">
                    <div>
                      <button
                        className="Quiz_Save_MarkforReview"
                        onClick={markForReview}
                      >
                        Save & Mark for Review
                      </button>
                      <button
                        className="Quiz_clearResponse"
                        onClick={clearResponse}
                      >
                        Clear Response
                      </button>
                      <button
                        className="quizsave_next"
                        onClick={handleSaveNextQuestion}
                      >
                        Save & Next
                      </button>
                    </div>
                    <div className="quiz_Next_back">
                      <button
                        className="previous-btn"
                        onClick={handlePreviousClick}
                        disabled={currentQuestionIndex === 0}
                      >
                        <i className="fa-solid fa-angles-left"></i> Back
                      </button>
                      <button onClick={handleNextQuestion}>Next</button>

                      <button
                        style={{ background: "#f0a607da" }}
                        onClick={handleSubmit}
                        id="resume_btn"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* --------------- quiz option container -------------------- */}

            {/* --------------- quiz btns container -------------------- */}
          </div>

          <div className="quiz_exam_interface_body_right_container">
            {/* --------------- right bar -------------------- */}

            <div className="rightsidebar">
              <ButtonsFunctionality
                onQuestionSelect={handleQuestionSelect}
                questionStatus={questionStatus}
                setQuestionStatus={setQuestionStatus}
                answeredCount={answeredCount}
                notAnsweredCount={notAnsweredCount}
                answeredmarkedForReviewCount={answeredmarkedForReviewCount}
                markedForReviewCount={markedForReviewCount}
                VisitedCount={VisitedCount}
                selectedSubject={selectedSubject}
                questionData={questionData}
                updateQuestionStatus={updateQuestionStatus}
                // seconds={seconds}
                seconds={600}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3 id="result_header">Exam Summary</h3>
          <div className="result_page_links"></div>

          <div className="Exam_summary_table">
            <table id="customers">
              <tr>
                <td>Total Questions</td>
                <td>Answered Questions</td>
                <td>Not Answered Questions</td>
                <td>Not Visited Count</td>
                <td>Marked for Review Questions</td>
                <td>Answered & Marked for Review Questions</td>
              </tr>
              <tr>
                <td>{questionData.questions.length}</td>
                <td>{answeredCount}</td>
                <td>{notAnsweredCount}</td>
                <td>{NotVisitedb}</td>
                <td>{markedForReviewCount}</td>
                <td>{answeredmarkedForReviewCount}</td>
              </tr>
            </table>
          </div>

          <div>
            <h2 className="Exam_summary_question_tag">
              Are you sure you want to submit for final marking? <br />
              No changes will be allowed after submission.
            </h2>

            <div className="Exam_summary_btns">
              <Link
                className="es_btn"
                to={`/TestResultsPage/${testCreationTableId}/${userData.id}`}
              >
                Yes
              </Link>
              <button className="es_btn" onClick={handleNo}>
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
