//const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require("../middleware/async");
const Lecture = require('../models').Lecture;
const Sport = require('../models').Sport;

// @desc      Get lectures
// @route     GET /api/v1/sports/:sport_id/lectures
// @access    Public
exports.getLectures = asyncHandler(async (req, res, next) => {
  Lecture.findAll({
    include: [
      {
        model: Sport
      }
    ]
  })
  .then(lectures => {
    res.status(200).json(lectures)
  })
  .catch(err => {
    res.send("error: " + err)
  })
});


// @desc      Get single lectures
// @route     GET /api/v1/lectures/:id
// @access    Public
exports.getLecture = asyncHandler(async (req, res, next) => {
  const lecture = await Lecture.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Sport
      }
    ]
  })
  .catch(err => {
    res.send('error: ' + err)
  })

  res.status(200).json(lecture);
});
