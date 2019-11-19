const express = require("express");
const {
  getLectures,
  getLecture
} = require('../controllers/lectures');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');


router
  .route('/')
  .get(getLectures);

router
  .route('/:id')
  .get(getLecture);

module.exports = router;