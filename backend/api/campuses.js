const router = require('express').Router();
const { Campus, Student } = require('../db/models');

/**
 * GET /api/campuses
 * Returns all campuses
 */
router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll({
        order: [['name', 'ASC']]
      });
    res.json(campuses);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/campuses/:campusId
 * Returns one campus + its students
 */
router.get('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId, {
      include: {
        model: Student
      }
    });

    if (!campus) {
      res.status(404).send('Campus not found');
    } else {
      res.json(campus);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/campuses
 * creates a new campus
 */
router.post('/', async (req, res, next) => {
    try {
      const campus = await Campus.create(req.body);
      res.status(201).json(campus);
    } catch (err) {
      next(err);
    }
  });

  // update campus
router.put('/:campusId', async (req, res, next) => {
    try {
      const campus = await Campus.findByPk(req.params.campusId);
      if (!campus) return res.status(404).send('Campus not found');
      await campus.update(req.body);
      res.json(campus);
    } catch (err) {
      next(err);
    }
  });
  
  // delete campus
  router.delete('/:campusId', async (req, res, next) => {
    try {
      const campus = await Campus.findByPk(req.params.campusId);
      if (!campus) return res.status(404).send('Campus not found');
      await campus.destroy();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });
  
  
module.exports = router;
