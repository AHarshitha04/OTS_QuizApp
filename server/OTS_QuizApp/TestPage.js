const express = require("express");
const router = express.Router();
const db = require("../DataBase/db2");

router.get(
  "/feachingtest/:courseCreationId/:typeOfTestId",
  async (req, res) => {
    const { courseCreationId, typeOfTestId } = req.params;
    try {
      // Fetch tests from the database based on courseCreationId and typeOfTestId
      const [testRows] = await db.query(
        "SELECT * FROM test_creation_table WHERE courseCreationId = ? AND courseTypeOfTestId = ?",
        [courseCreationId, typeOfTestId]
      );
      res.json(testRows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/feachingtest/:courseCreationId", async (req, res) => {
  const { courseCreationId } = req.params;
  try {
    // Fetch exams from the database
    const [rows] = await db.query(
      // "SELECT * FROM test_creation_table WHERE  courseCreationId  = ?",
      "SELECT tc.courseCreationId, ct.courseCreationId, tc.testCreationTableId,ct.courseName, tc.TestName, tc.testStartDate, tc.testEndDate, tc.testStartTime, tc.testEndTime, tc.Duration, tc.TotalQuestions, tc.totalMarks, tc.calculator, tc.status, tc.instructionId FROM test_creation_table AS tc JOIN course_creation_table AS ct ON ct.courseCreationId = tc.courseCreationId WHERE tc.courseCreationId = ?",
      [courseCreationId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/feachingtypeoftest", async (req, res) => {
  try {
    // Fetch type_of_test data from the database
    const [typeOfTestRows] = await db.query("SELECT * FROM type_of_test");
    res.json(typeOfTestRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
