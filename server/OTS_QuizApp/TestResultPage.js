const express = require("express");
const router = express.Router();
const db = require("../DataBase/db2");

router.get("/getEmployeeData", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decodedToken = jwt.verify(
    token.replace("Bearer ", ""),
    "your_secret_key"
  );

  if (!decodedToken) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const employeeId = decodedToken.id;

  const fetchEmployeeSql = "SELECT * FROM user_responses e  WHERE user_Id = ?";

  db.query(fetchEmployeeSql, [employeeId], (error, results) => {
    if (error || results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const employee = results[0];

    // You may want to filter out sensitive information before sending it to the client
    const sanitizedEmployee = {
      Empoye_ID: employee.user_Id,
      EmpoyeeEmail: employee.EmpoyeeEmail,
      EmpoyeeName: employee.EmpoyeeName,
      // Add other fields as needed
    };

    res.status(200).json(sanitizedEmployee);
  });
});

router.get("/questionCount", async (req, res) => {
  const { testCreationTableId, subjectId, sectionId } = req.params;
  try {
    const [results, fields] = await db.execute(
      `SELECT t.testCreationTableId, COUNT(q.question_id) AS total_question_count 
        FROM 
        test_creation_table t 
        LEFT JOIN questions q ON t.testCreationTableId = q.testCreationTableId 
        WHERE t.testCreationTableId = ?;`
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/questionCount/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    const [results, fields] = await db.execute(
      `SELECT t.testCreationTableId, COUNT(q.question_id) AS total_question_count 
        FROM 
        test_creation_table t 
        LEFT JOIN questions q ON t.testCreationTableId = q.testCreationTableId 
        WHERE t.testCreationTableId = ?;`,
      [testCreationTableId]
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching question count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/answer/:testCreationTableId/:user_Id", async (req, res) => {
  try {
    const { testCreationTableId, user_Id } = req.params;
    const [results] = await db.query(
      `
      SELECT
      a.question_id,
      a.answer_text,
      ur.user_answer,
      TRIM(COALESCE(ur.user_answer, '--')) AS trimmed_user_answer,
      TRIM(a.answer_text) AS trimmed_answer_text,
      LENGTH(TRIM(COALESCE(ur.user_answer, '--'))) AS user_answer_length,
      LENGTH(TRIM(a.answer_text)) AS answer_text_length,
      CASE 
          WHEN ur.user_answer IS NULL THEN 'N/A' 
          WHEN TRIM(BINARY ur.user_answer) = TRIM(BINARY a.answer_text) AND ur.user_answer != '' THEN 'correct' 
          ELSE 'incorrect'
      END AS status
  FROM
      answer a
  LEFT JOIN 
      user_responses ur ON a.question_id = ur.question_id AND ur.testCreationTableId = ?
      `,
      [testCreationTableId, user_Id]
    );

    console.log(results); // Log the results to see if STATUS is populated correctly

    res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/getResponse/:testCreationTableId/:user_Id/:questionId",
  async (req, res) => {
    try {
      const { testCreationTableId, user_Id, questionId } = req.params;
      const [results] = await db.query(
        `
      SELECT
      *
  FROM
      user_responses ur
  JOIN test_creation_table tc ON
      tc.testCreationTableId = ur.testCreationTableId
  JOIN LOG l ON
      l.user_Id = ur.user_Id
  JOIN questions q ON
      q.question_id = ur.question_id
      `,
        [testCreationTableId, user_Id]
      );

      console.log(results); // Log the results to see if STATUS is populated correctly

      res.json(results);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get(
  "/getTimeLeftSubmissions/:testCreationTableId/:userId",
  async (req, res) => {
    try {
      const { testCreationTableId, userId } = req.params;

      // Your SQL query
      const query = `
        SELECT *
        FROM time_left_submission_of_test ts
        JOIN user_responses ur ON ts.user_Id = ur.user_Id AND ts.testCreationTableId = ur.testCreationTableId
        WHERE ur.user_Id = ? AND ts.testCreationTableId = ?
        LIMIT 1;
      `;

      // Execute the query using promises
      const [rows, fields] = await db.execute(query, [
        userId,
        testCreationTableId,
      ]);

      // Send the result as JSON
      res.json(rows);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
