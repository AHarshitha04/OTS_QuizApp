const express = require('express');
const router = express.Router();
const db = require('../DataBase/db2');

router.get('/courses/count', async (req, res) => {
    try {
      const [results, fields] = await db.execute(
        'SELECT COUNT(courseCreationId) AS count FROM course_creation_table'
      );
      res.json(results);
    } catch (error) {
      console.error('Error fetching course count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/exam/count', async (req, res) => {
    try {
      const [results, fields] = await db.execute(
        'SELECT COUNT(examId) AS count FROM exams'
      );
      res.json(results);
    } catch (error) {
      console.error('Error fetching course count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/test/count', async (req, res) => {
    try {
      const [results, fields] = await db.execute(
        'SELECT COUNT(testCreationTableId) AS count FROM test_creation_table'
      );
      res.json(results);
    } catch (error) {
      console.error('Error fetching course count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/user/count', async (req, res) => {
    try {
      const [results, fields] = await db.execute(
        "SELECT COUNT(user_Id) AS count FROM log WHERE role = 'viewer'"
      );
      res.json(results);
    } catch (error) {
      console.error('Error fetching course count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/question/count', async (req, res) => {
    try {
      const [results, fields] = await db.execute(
        'SELECT COUNT(question_id) AS count FROM questions'
      );
      res.json(results);
    } catch (error) {
      console.error('Error fetching course count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;