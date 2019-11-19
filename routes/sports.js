const express = require("express");
const {
  getSports,
  getSport,
  createLectures,
  createAllLectures
} = require('../controllers/sports');
const { protect, authorize } = require('../middleware/auth');

const lectureRouter = require('./lectures');

const router = express.Router({ mergeParams: true });



router.use('/:sport_id/lectures', lectureRouter)

router
  .route('/')
  .get(getSports)

router
  .route('/:id')
  .get(getSport);

router
  .route('/create-lectures')
  .post(createAllLectures);

// router
//   .route('/:id/create-lectures')
//   .post(createLectures);

module.exports = router;