const router = require('express').Router();
const { Student, Campus } = require('../db/models');

/**
 * GET /api/students
 * returns all students
 */
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll({
        order: [['lastName', 'ASC']]
      });
    res.json(students);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/students/:studentId
 * returns one student + their campus
 */
router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId, {
      include: {
        model: Campus
      }
    });

    if (!student) {
      res.status(404).send('Student not found');
    } else {
      res.json(student);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/students
 * creates a new student
 */
router.post('/', async (req, res, next) => {
    try {
      const student = await Student.create(req.body);
      res.status(201).json(student);
    } catch (err) {
      next(err);
    }
  });

  // update student
router.put('/:studentId', async (req, res, next) => {
    try {
      const student = await Student.findByPk(req.params.studentId);
      if (!student) return res.status(404).send('Student not found');
      await student.update(req.body);
      res.json(student);
    } catch (err) {
      next(err);
    }
  });
  
  // delete student
  router.delete('/:studentId', async (req, res, next) => {
    try {
      const student = await Student.findByPk(req.params.studentId);
      if (!student) return res.status(404).send('Student not found');
      await student.destroy();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });
  
  

module.exports = router;
