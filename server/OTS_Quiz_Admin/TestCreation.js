const express = require('express');
const router = express.Router();
const db = require('../databases/db2');


router.get('/testcourses', async (req, res) => {
    try {
      const [ rows ] = await db.query('SELECT courseCreationId,courseName FROM course_creation_table');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
   
  // Add a new endpoint to fetch subjects based on courseCreationId
  router.get('/course-subjects/:courseCreationId', async (req, res) => {
    const { courseCreationId } = req.params;
   
    try {
      const [subjects] = await db.query(
        'SELECT s.subjectId, s.subjectName FROM subjects s JOIN course_subjects cs ON s.subjectId = cs.subjectId WHERE cs.courseCreationId = ?',
        [courseCreationId]
      );
   
      res.json(subjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).send('Error fetching subjects.');
    }
  });
   
  router.post('/create-test', async (req, res) => {
    const {
      testName,
      selectedCourse,
      selectedtypeOfTest,  // Assuming this is the correct property name
      startDate,
      startTime,
      endDate,
      endTime,
      duration,
      totalQuestions,
      totalMarks,
      calculator,
      sectionsData,
      selectedInstruction,
    } = req.body;
   
    try {
      const [result] = await db.query(
        'INSERT INTO test_creation_table (TestName, courseCreationId, courseTypeOfTestId, testStartDate, testEndDate, testStartTime, testEndTime, Duration, TotalQuestions, totalMarks, calculator, instructionId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [testName, selectedCourse, selectedtypeOfTest, startDate, endDate, startTime, endTime, duration, totalQuestions, totalMarks, calculator, selectedInstruction]
      );
   
      if (result && result.insertId) {
        const testCreationTableId = result.insertId;
   
        // Process sectionsData and insert into sections table
        const results = await Promise.all(
          sectionsData.map(async (section) => {
            // Ensure selectedSubjects is defined and has a value
            const subjectId = section.selectedSubjects || 0;
       
            const [sectionResult] = await db.query(
              'INSERT INTO sections (testCreationTableId, sectionName, noOfQuestions, QuestionLimit, subjectId) VALUES (?, ?, ?, ?, ?)',
              [testCreationTableId, section.sectionName || null, section.noOfQuestions, section.QuestionLimit || null, subjectId]
            );
            return sectionResult;
          })
        );
       
        res.json({ success: true, testCreationTableId, results, message: 'Test created successfully' });
      }
    } catch (error) {
      console.error('Error creating test:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
   
   
  router.get('/instructions', async (req, res) => {
    try {
      const [instructions] = await db.query('SELECT instructionId, instructionHeading FROM instruction');
      res.json(instructions);
    } catch (error) {
      console.error('Error fetching instructions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // Add this new API endpoint
  router.get('/course-typeoftests/:courseCreationId', async (req, res) => {
    const { courseCreationId } = req.params;
   
    try {
      const [rows] = await db.query(
        'SELECT type_of_test.TypeOfTestId, type_of_test.TypeOfTestName,course_typeoftests.courseTypeOfTestId ' +
        'FROM course_typeoftests ' +
        'INNER JOIN type_of_test ON course_typeoftests.TypeOfTestId = type_of_test.TypeOfTestId ' +
        'WHERE course_typeoftests.courseCreationId = ?',
        [courseCreationId]
      );
   
      res.json(rows);
    } catch (error) {
      console.error('Error fetching course_typeoftests:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
   
   
  router.get('/test_creation_table', async (req, res) => {
    try {
      const query =` SELECT tt.testCreationTableId,tt.TestName,cc.courseName,tt.testStartDate,tt.testEndDate,tt.testStartTime,tt.testEndTime,tt.status  FROM test_creation_table tt JOIN  course_creation_table cc ON tt.courseCreationId=cc.courseCreationId `
      const [rows] = await db.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error creating sections:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
   
  router.delete('/test_table_data_delete/:testCreationTableId', async (req, res) => {
    const testCreationTableId = req.params.testCreationTableId;
   
    try {
      await db.query('DELETE test_creation_table, sections FROM test_creation_table LEFT JOIN sections ON test_creation_table.testCreationTableId = sections.testCreationTableId WHERE test_creation_table.testCreationTableId = ?', [testCreationTableId]);
      res.json({ message: `course with ID ${testCreationTableId} deleted from the database` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
   
   
  router.get('/testupdate/:testCreationTableId', async (req, res) => {
    const { testCreationTableId } = req.params;
   
    try {
      const [rows] = await db.query(`
      SELECT
      tc.testCreationTableId,
      tc.TestName,
      tc.testStartDate,
      tc.testEndDate,
      tc.testStartTime,
      tc.testEndTime,
      tc.Duration,
      tc.TotalQuestions,
      tc.totalMarks,
      tc.calculator,
    
      cc.courseCreationId,
      cc.courseName,
      ctt.courseTypeOfTestId,
      tt.TypeOfTestName,
      i.instructionId,
      i.instructionHeading,
      s.sectionName,
      s.noOfQuestions,
      s.QuestionLimit
  FROM
      test_creation_table AS tc
  INNER JOIN course_creation_table AS cc
  ON
      tc.courseCreationId = cc.courseCreationId
  INNER JOIN course_typeoftests AS ctt
  ON
      tc.courseCreationId = ctt.courseCreationId
  INNER JOIN type_of_test AS tt
  ON
      ctt.TypeOfTestId = tt.TypeOfTestId
  INNER JOIN instruction AS i
  ON
      tc.instructionId = i.instructionId
       INNER JOIN
          sections AS s ON tc.testCreationTableId = s.testCreationTableId
  WHERE
      tc.testCreationTableId = ?
      `, [testCreationTableId]);
   
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: 'Test not found' });
      }
    } catch (error) {
      console.error('Error fetching test data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
   
   
   
  router.put('/test-update/:testCreationTableId', async (req, res) => {
    const testCreationTableId = req.params.testCreationTableId;
    const {
      TestName,
      selectedCourse,
      selectedTypeOfTests,
      testStartDate,
      testEndDate,
      testStartTime,
      testEndTime,
      Duration,
      TotalQuestions,
      totalMarks,
      calculator,
     
      sectionId,
      sectionName,
      noOfQuestions,
      QuestionLimit,
      selectedInstruction,
    } = req.body;
   
    const updateQuery = `UPDATE test_creation_table
                         SET TestName=?, courseCreationId=?, courseTypeOfTestId=?,
                             testStartDate=?, testEndDate=?, testStartTime=?,
                             testEndTime=?, Duration=?, TotalQuestions=?,
                             totalMarks=?, calculator=?, instructionId=?
                         WHERE testCreationTableId=?`;
   
    try {
      await db.query(updateQuery, [
        TestName,
        selectedCourse,
        selectedTypeOfTests,
        testStartDate,
        testEndDate,
        testStartTime,
        testEndTime,
        Duration,
        TotalQuestions,
        totalMarks,
        calculator,
        selectedInstruction,
        testCreationTableId,
      ]);
   
      // Log the update result
      const updateResult = await db.query('SELECT * FROM test_creation_table WHERE testCreationTableId = ?', [testCreationTableId]);
      console.log('Update Result:', updateResult);
   
      // Update section
      const updateSectionQuery = `UPDATE sections
                                  SET sectionName=?, noOfQuestions=?, QuestionLimit=?
                                  WHERE testCreationTableId=? AND sectionId=?`;
   
      await db.query(updateSectionQuery, [
        sectionName,
        noOfQuestions,
        QuestionLimit,
        testCreationTableId,
        sectionId,
      ]);
   
      res.json({ message: 'Test and section updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  

  // router.get('/TestActivation', async (req, res) => {
  //   // Fetch subjects
  //   try {
  //     const [rows] = await db.query(`SELECT
  //     t.testCreationTableId,
  //     t.TestName,
  //     t.TotalQuestions,
  //     s.subjectId,
  //     s.subjectName,
  //     sc.sectionId,
  //     sc.sectionName,
  //     sc.noOfQuestions AS numberOfQuestionsInSection,
  //     subquery.numberOfQuestionsInSubject
  // FROM
  //     test_creation_table AS t
  // LEFT JOIN course_subjects AS cs ON t.courseCreationId = cs.courseCreationId
  // LEFT JOIN subjects AS s ON s.subjectId = cs.subjectId
  // LEFT JOIN sections AS sc ON sc.subjectId = s.subjectId
  // LEFT JOIN (
  //     SELECT
  //         q.subjectId,
  //         COUNT(q.question_id) AS numberOfQuestionsInSubject
  //     FROM
  //         questions AS q
  //     GROUP BY
  //         q.subjectId
  // ) AS subquery ON s.subjectId = subquery.subjectId
  // LEFT JOIN questions AS q ON t.testCreationTableId = q.testCreationTableId
  //                       AND sc.sectionId = q.sectionId
  //                       AND s.subjectId = q.subjectId
  // WHERE
  //     t.testCreationTableId = ?
  // GROUP BY
  //     t.testCreationTableId,
  //     t.TestName,
  //     t.TotalQuestions,
  //     s.subjectId,
  //     s.subjectName,
  //     sc.sectionId,
  //     sc.sectionName,
  //     sc.noOfQuestions,
  //     subquery.numberOfQuestionsInSubject`);
  //     res.json(rows);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });


  router.get('/TestActivation', async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT
          t.testCreationTableId,
          t.TestName,
          t.TotalQuestions,
          s.subjectId,
          s.subjectName,
          sc.sectionId,
          sc.sectionName,
          sc.noOfQuestions AS numberOfQuestionsInSection,
          subquery.numberOfQuestionsInSubject
        FROM
          test_creation_table AS t
        LEFT JOIN course_subjects AS cs ON t.courseCreationId = cs.courseCreationId
        LEFT JOIN subjects AS s ON s.subjectId = cs.subjectId
        LEFT JOIN sections AS sc ON sc.subjectId = s.subjectId
        LEFT JOIN (
          SELECT
            q.subjectId,
            COUNT(q.question_id) AS numberOfQuestionsInSubject
          FROM
            questions AS q
          GROUP BY
            q.subjectId
        ) AS subquery ON s.subjectId = subquery.subjectId
        LEFT JOIN questions AS q ON t.testCreationTableId = q.testCreationTableId
                                AND sc.sectionId = q.sectionId
                                AND s.subjectId = q.subjectId
        WHERE
          t.testCreationTableId = 3
        GROUP BY
          t.testCreationTableId,
          t.TestName,
          t.TotalQuestions,
          s.subjectId,
          s.subjectName,
          sc.sectionId,
          sc.sectionName,
          sc.noOfQuestions,
          subquery.numberOfQuestionsInSubject
      `);
  
      // Organize the data into a structured JSON response
      const tests = rows.map(row => {
        const existingTest = tests.find(test => test.testCreationTableId === row.testCreationTableId);
        if (existingTest) {
          // Test already exists, add subject and section to existing test
          const existingSubject = existingTest.subjects.find(subject => subject.subjectId === row.subjectId);
          if (existingSubject) {
            // Subject already exists, add section to existing subject
            existingSubject.sections.push({
              sectionId: row.sectionId,
              sectionName: row.sectionName,
              numberOfQuestions: row.numberOfQuestionsInSection,
            });
          } else {
            // Subject does not exist, create a new subject
            existingTest.subjects.push({
              subjectId: row.subjectId,
              subjectName: row.subjectName,
              sections: [{
                sectionId: row.sectionId,
                sectionName: row.sectionName,
                numberOfQuestions: row.numberOfQuestionsInSection,
              }],
            });
          }
        } else {
          // Test does not exist, create a new test with subject and section
          tests.push({
            testCreationTableId: row.testCreationTableId,
            TestName: row.TestName,
            TotalQuestions: row.TotalQuestions,
            subjects: [{
              subjectId: row.subjectId,
              subjectName: row.subjectName,
              sections: [{
                sectionId: row.sectionId,
                sectionName: row.sectionName,
                numberOfQuestions: row.numberOfQuestionsInSection,
              }],
            }],
          });
        }
      });
  
      res.json(tests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // In your server code
  router.get('/getQuestionCountForTest/:testId', async (req, res) => {
    const { testId } = req.params;
  
    try {
      const [rows] = await db.query(`
        SELECT COUNT(*) AS count
        FROM questions
        WHERE testCreationTableId = ?
      `, [testId]);
  
      const questionCount = rows[0].count;
  
      res.json({ count: questionCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  
  module.exports = router;