const express = require("express");
const router = express.Router();
const db= require("../DataBases/db2");

router.get("/type_of_tests", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT typeOfTestId, typeOfTestName FROM type_of_test"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// --------------- fetch type of Questions -----------------------------
router.get("/type_of_questions", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT quesionTypeId, typeofQuestion FROM quesion_type"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// --------------- fetch exams -----------------------------
router.get("/courese-exams", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT  examId,examName FROM exams");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// --------------- fetch subjects -----------------------------
router.get("/courese-exam-subjects/:examId/subjects", async (req, res) => {
  const examId = req.params.examId;

  try {
    const query = `
        SELECT s.subjectId, s.subjectName
        FROM subjects AS s
        JOIN exam_creation_table AS ec ON s.subjectId = ec.subjectId
        WHERE ec.examId = ?
      `;
    const [rows] = await db.query(query, [examId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// --------------- inserting data into course_creation_table -----------------------------
router.post("/course-creation", async (req, res) => {
  const {
    courseName,
    courseYear,
    examId,
    courseStartDate,
    courseEndDate,
    cost,
    discount,
    totalPrice,
  } = req.body;

  try {
    // Insert the course data into the course_creation_table
    const [result] = await db.query(
      "INSERT INTO course_creation_table (courseName,courseYear,  examId,  courseStartDate, courseEndDate , cost, Discount, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
      [
        courseName,
        courseYear,
        examId,
        courseStartDate,
        courseEndDate,
        cost,
        discount,
        totalPrice,
      ]
    );

    // Check if the course creation was successful
    if (result && result.insertId) {
      const courseCreationId = result.insertId;

      // Return the courseCreationId in the response
      res.json({ message: "Course created successfully", courseCreationId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// --------------- inserting data into course_typeOftests,course_subjects,course_type_of_question  -----------------------------
router.post("/course_type_of_question", async (req, res) => {
  try {
    // Extract data from the request body
    const { courseCreationId, typeOfTestIds, subjectIds, typeofQuestion } =
      req.body;
    // console.log('Received request to add subjects and question types for courseCreationId:', courseCreationId);

    console.log("Received data:", req.body);

    for (const typeOfTestId of typeOfTestIds) {
      const query =
        "INSERT INTO course_typeOftests (courseCreationId, typeOfTestId) VALUES (?, ?)";
      const values = [courseCreationId, typeOfTestId];

      // Log the query before execution
      console.log("Executing query:", db.format(query, values));

      // Execute the query
      await db.query(query, values);
    }

    // Insert subjects into the course_subjects table
    console.log("Received data:", req.body);
    for (const subjectId of subjectIds) {
      const query =
        "INSERT INTO course_subjects (courseCreationId, subjectId) VALUES (?, ?)";
      const values = [courseCreationId, subjectId];
      console.log("Executing query:", db.format(query, values));
      await db.query(query, values);
    }

    // Insert question types into the course_type_of_question table
    for (const quesionTypeId of typeofQuestion) {
      const query =
        "INSERT INTO course_type_of_question (courseCreationId, quesionTypeId) VALUES (?, ?)";
      const values = [courseCreationId, quesionTypeId];
      console.log("Executing query:", db.format(query, values));
      await db.query(query, values);
    }

    // Respond with success message
    res.json({
      success: true,
      message: "Subjects and question types added successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// --------------- geting data  course_creation_table,course_typeOftests,course_subjects,course_type_of_question  -----------------------------
router.get("/course_creation_table", async (req, res) => {
  try {
    const query = `
      SELECT
      cc.*,
      subjects.subjects AS subjects,
      questions.quesion_types AS question_types,
      e.examName,
      typeOfTests.type_of_test AS type_of_test
  FROM
      course_creation_table cc
        
      LEFT JOIN(
      SELECT ctt.courseCreationId,
          GROUP_CONCAT(t.typeOfTestName) AS type_of_test
      FROM
          course_typeoftests ctt
      LEFT JOIN type_of_test t ON
          ctt.typeOfTestId = t.typeOfTestId
      GROUP BY
          ctt.courseCreationId
  ) AS typeOfTests
  ON
      cc.courseCreationId = typeOfTests.courseCreationId
      
      
  LEFT JOIN(
      SELECT cs.courseCreationId,
          GROUP_CONCAT(s.subjectName) AS subjects
      FROM
          course_subjects cs
      LEFT JOIN subjects s ON
          cs.subjectId = s.subjectId
      GROUP BY
          cs.courseCreationId
  ) AS subjects
  ON
      cc.courseCreationId = subjects.courseCreationId
  LEFT JOIN(
      SELECT ct.courseCreationId,
          GROUP_CONCAT(q.typeofQuestion) AS quesion_types
      FROM
          course_type_of_question ct
      LEFT JOIN quesion_type q ON
          ct.quesionTypeId = q.quesionTypeId
      GROUP BY
          ct.courseCreationId
  ) AS questions
  ON
      cc.courseCreationId = questions.courseCreationId
  JOIN exams AS e
  ON
      cc.examId = e.examId;
       `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// --------------- deleting data into course_creation_table,course_typeOftests,course_subjects,course_type_of_question  -----------------------------
router.delete(
  "/course_creation_table_Delete/:courseCreationId",
  async (req, res) => {
    const courseCreationId = req.params.courseCreationId;

    try {
      await db.query(
        "DELETE course_creation_table, course_subjects, course_type_of_question, course_typeoftests FROM course_creation_table LEFT JOIN course_typeoftests ON course_creation_table.courseCreationId = course_typeoftests.courseCreationId LEFT JOIN course_subjects ON course_creation_table.courseCreationId = course_subjects.courseCreationId LEFT JOIN course_type_of_question ON course_creation_table.courseCreationId = course_type_of_question.courseCreationId WHERE course_creation_table.courseCreationId = ?",
        [courseCreationId]
      );

      res.json({
        message: `course with ID ${courseCreationId} deleted from the database`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// --------------- updating data into course_creation_table,course_typeOftests,course_subjects,course_type_of_question  -----------------------------
router.get("/courseupdate/:courseCreationId", async (req, res) => {
  const courseCreationId = req.params.courseCreationId;

  try {
    const query = `
        SELECT
        cc.*,
        subjects.subjects AS subjects,
        questions.quesion_types AS question_types,
        e.examName,
        typeOfTests.type_of_test AS type_of_test
    FROM
        course_creation_table cc
        
     LEFT JOIN(
        SELECT ctt.courseCreationId,
            GROUP_CONCAT(t.typeOfTestName) AS type_of_test
        FROM
            course_typeoftests ctt
        LEFT JOIN type_of_test t ON
            ctt.typeOfTestId = t.typeOfTestId
        GROUP BY
            ctt.courseCreationId
    ) AS typeOfTests
    ON
        cc.courseCreationId = typeOfTests.courseCreationId   
        
    LEFT JOIN(
        SELECT cs.courseCreationId,
            GROUP_CONCAT(s.subjectName) AS subjects
        FROM
            course_subjects cs
        LEFT JOIN subjects s ON
            cs.subjectId = s.subjectId
        GROUP BY
            cs.courseCreationId
    ) AS subjects
    ON
        cc.courseCreationId = subjects.courseCreationId
    LEFT JOIN(
        SELECT ct.courseCreationId,
            GROUP_CONCAT(q.typeofQuestion) AS quesion_types
        FROM
            course_type_of_question ct
        LEFT JOIN quesion_type q ON
            ct.quesionTypeId = q.quesionTypeId
        GROUP BY
            ct.courseCreationId
    ) AS questions
    ON
        cc.courseCreationId = questions.courseCreationId
    JOIN exams AS e
    ON
        cc.examId = e.examId
    WHERE
        cc.courseCreationId = ?;
        `;

    const [course] = await db.query(query, [courseCreationId]);

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// --------------- feaching selected data from course_typeOftests,course_subjects,course_type_of_question  -----------------------------
router.get("/course_subjects/:courseCreationId", async (req, res) => {
  const courseCreationId = req.params.courseCreationId;

  try {
    // Query the database to get selected subjects for the specified courseCreationId
    const query = `
          SELECT cs.subjectId
          FROM course_subjects AS cs
          WHERE cs.courseCreationId = ?
        `;
    const [rows] = await db.query(query, [courseCreationId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/course-type-of-questions/:courseCreationId", async (req, res) => {
  const courseCreationId = req.params.courseCreationId;

  try {
    const query = `
          SELECT ctoq.quesionTypeId, qt.typeofQuestion
          FROM course_type_of_question AS ctoq
          JOIN quesion_type AS qt ON ctoq.quesionTypeId = qt.quesionTypeId
          WHERE ctoq.courseCreationId = ?
        `;
    const [rows] = await db.query(query, [courseCreationId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/course-type-of-test/:courseCreationId", async (req, res) => {
  const courseCreationId = req.params.courseCreationId;

  try {
    const query = `
          SELECT ctot.typeOfTestId , tt.typeOfTestName
          FROM course_typeoftests AS ctot
          JOIN type_of_test AS tt ON ctot.typeOfTestId  = tt.typeOfTestId 
          WHERE ctot.courseCreationId = ?
        `;
    const [rows] = await db.query(query, [courseCreationId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update-course/:courseCreationId", async (req, res) => {
  const courseCreationId = req.params.courseCreationId;

  const {
    courseName,
    selectedExam,
    courseStartDate,
    courseEndDate,
    cost,
    discount,
    totalPrice,
    selectedTypeOfTests,
    selectedSubjects,
    selectedQuestionTypes,
  } = req.body;

  const updateQuery = `
    UPDATE course_creation_table
    SET
      courseName = ?,
      examId = ?,
      courseStartDate = ?,
      courseEndDate = ?,
      cost = ?,
      Discount = ?,       
      totalPrice = ?
    WHERE courseCreationId = ?;
  `;

  try {
    await db.query(updateQuery, [
      courseName,
      selectedExam,
      courseStartDate,
      courseEndDate,
      cost,
      discount,
      totalPrice,
      courseCreationId,
    ]);

    // Handle type of tests update
    const deleteTypeOfTestQuery =
      "DELETE FROM course_typeoftests WHERE courseCreationId = ?";
    await db.query(deleteTypeOfTestQuery, [courseCreationId]);

    const insertTestOfTestQuery =
      "INSERT INTO course_typeoftests (courseCreationId, typeOfTestId) VALUES (?, ?)";
    for (const typeOfTestId of selectedTypeOfTests) {
      await db.query(insertTestOfTestQuery, [courseCreationId, typeOfTestId]);
    }

    // Handle subjects update (assuming course_subjects table has columns courseCreationId and subjectId)
    const deleteSubjectsQuery =
      "DELETE FROM course_subjects WHERE courseCreationId = ?";
    await db.query(deleteSubjectsQuery, [courseCreationId]);

    const insertSubjectsQuery =
      "INSERT INTO course_subjects (courseCreationId, subjectId) VALUES (?, ?)";
    for (const subjectId of selectedSubjects) {
      await db.query(insertSubjectsQuery, [courseCreationId, subjectId]);
    }

    // Handle question types update (assuming course_type_of_question table has columns courseCreationId and quesionTypeId)
    const deleteQuestionTypesQuery =
      "DELETE FROM course_type_of_question WHERE courseCreationId = ?";
    await db.query(deleteQuestionTypesQuery, [courseCreationId]);

    const insertQuestionTypesQuery =
      "INSERT INTO course_type_of_question (courseCreationId, quesionTypeId) VALUES (?, ?)";
    for (const quesionTypeId of selectedQuestionTypes) {
      await db.query(insertQuestionTypesQuery, [
        courseCreationId,
        quesionTypeId,
      ]);
    }

    res.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
