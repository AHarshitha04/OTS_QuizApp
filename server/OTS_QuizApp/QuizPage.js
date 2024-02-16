const express = require("express");
const router = express.Router();
const db = require("../DataBase/db2");
const jwt = require("jsonwebtoken");

router.get("/questionType/:questionId", async (req, res) => {
    try {
      const { questionId } = req.params;
      const [results] = await db.query(
        `
        SELECT q.question_id, q.testCreationTableId ,qt.qtypeId, qt.qtype_text, qts.typeofQuestion, qts.quesionTypeId FROM questions q 
        JOIN qtype qt ON q.question_id = qt.question_id 
        JOIN quesion_type qts ON qt.quesionTypeId = qts.quesionTypeId WHERE q.question_id = ?;
        `,
        [questionId]
      );
  
      res.json(results);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });


  router.get("/questionOptions/:testCreationTableId", async (req, res) => {
    const { testCreationTableId } = req.params;
    try {
      const [rows] = await db.query(
        `SELECT 
        q.question_id, q.questionImgName, 
        o.option_id, o.optionImgName, o.option_index,
        s.solution_id, s.solutionImgName, 
        qt.qtypeId, qt.qtype_text,
        ur.user_answer, ur.user_Sno, qts.typeofQuestion,
        ans.answer_id, ans.answer_text,
        m.markesId, m.marks_text,
        si.sort_id, si.sortid_text,
        doc.documen_name, doc.sectionId, 
        doc.subjectId, doc.testCreationTableId,
        P.paragraphImg, p.paragraph_Id,
        pq.paragraphQNo_Id, pq.paragraphQNo, qts.quesionTypeId,
        tct.TestName  -- New column from testcreationtable
    FROM 
        questions q 
        LEFT OUTER JOIN options o ON q.question_id = o.question_id
        LEFT OUTER JOIN qtype qt ON q.question_id = qt.question_id 
        LEFT OUTER JOIN quesion_type qts ON qt.quesionTypeId = qts.quesionTypeId 
        LEFT OUTER JOIN answer ans ON q.question_id = ans.question_id 
        LEFT OUTER JOIN marks m ON q.question_id = m.question_id 
        LEFT OUTER JOIN sortid si ON q.question_id = si.question_id 
        LEFT OUTER JOIN solution s ON q.question_id = s.solution_id 
        LEFT OUTER JOIN paragraph p ON q.document_Id = p.document_Id
        LEFT OUTER JOIN paragraphqno pq ON p.paragraph_Id = pq.paragraph_Id AND q.question_id = pq.question_id
        LEFT OUTER JOIN ots_document doc ON q.document_Id = doc.document_Id
        LEFT OUTER JOIN user_responses ur ON q.question_id = ur.question_id and o.option_id = ur.option_id
        LEFT OUTER JOIN test_creation_table tct ON doc.testCreationTableId = tct.testCreationTableId  -- Joining with testcreationtable
    WHERE 
        doc.testCreationTableId = ?
    ORDER BY q.question_id ASC, o.option_index ASC; 
  `,
        [testCreationTableId]
      );
  
      // Check if rows is not empty
      if (rows.length > 0) {
        const questionData = {
          questions: [],
        };
  
        // Organize data into an array of questions
        rows.forEach((row) => {
          const existingQuestion = questionData.questions.find(
            (q) => q.question_id === row.question_id
          );
          const option = {
            option_id: row.option_id,
            option_index: row.option_index,
            optionImgName: row.optionImgName,
            ans: row.user_answer,
          };
          if (existingQuestion) {
            const existingOption = existingQuestion.options.find(
              (opt) => opt.option_id === option.option_id
            );
  
            if (!existingOption) {
              existingQuestion.options.push(option);
            }
          } else {
            // Question doesn't exist, create a new question
            const newQuestion = {
              TestName:row.TestName,
              question_id: row.question_id,
              questionImgName: row.questionImgName,
              documen_name: row.documen_name,
              options: [option],
              subjectId: row.subjectId,
              sectionId: row.sectionId,
              qtype: {
                qtypeId: row.qtypeId,
                qtype_text: row.qtype_text,
              },
              quesion_type: {
                quesionTypeId: row.quesionTypeId,
                quesion_type: row.quesion_type,
                typeofQuestion: row.typeofQuestion,
              },
              answer: {
                answer_id: row.answer_id,
                answer_text: row.answer_text,
              },
              useranswer: {
                urid: row.question_id,
                // ans: row.user_answer,
                urid: row.question_id,
              },
              marks: {
                markesId: row.markesId,
                marks_text: row.marks_text,
              },
              sortid: {
                sort_id: row.sort_id,
                sortid_text: row.sortid_text,
              },
  
              paragraph: {},
              paragraphqno: {},
            };
  
            if (row.paragraph_Id && row.paragraphQNo) {
              newQuestion.paragraph = {
                paragraph_Id: row.paragraph_Id,
                paragraphImg: row.paragraphImg,
              };
  
              newQuestion.paragraphqno = {
                paragraphQNo_Id: row.paragraphQNo_Id,
                paragraphQNo: row.paragraphQNo,
              };
            }
  
            questionData.questions.push(newQuestion);
          }
        });
  
        res.json(questionData);
      } else {
        res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/submitTimeLeft", async (req, res) => {
    try {
      const { userId, testCreationTableId, timeLeft } = req.body;
  
      // Validate data types
      const userIdNumber = parseInt(userId, 10);
      const testCreationTableIdNumber = parseInt(testCreationTableId, 10);
  
      if (
        isNaN(userIdNumber) ||
        isNaN(testCreationTableIdNumber) ||
        typeof timeLeft !== "string"
      ) {
        console.error("Invalid data types");
        return res
          .status(400)
          .json({ success: false, message: "Invalid data types" });
      }
  
      // Continue with processing
      const sql =
        "INSERT INTO time_left_submission_of_test (user_Id, testCreationTableId, time_left) VALUES (?,?,?)";
  
      const queryValues = [userIdNumber, testCreationTableIdNumber, timeLeft];
  
      console.log(
        "Executing SQL query for time left submission:",
        sql,
        queryValues
      );
  
      await new Promise((resolve, reject) => {
        db.query(sql, queryValues, (err, result) => {
          if (err) {
            console.error("Error saving time left to the database:", err);
            reject(err);
          } else {
            console.log("Time left submission saved to the database");
            resolve(result);
          }
        });
      });
  
      res.json({
        success: true,
        message: "Time left submission saved successfully",
      });
    } catch (error) {
      console.error("Error handling time left submission:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  module.exports = router;