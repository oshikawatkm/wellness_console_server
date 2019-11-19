//const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require("../middleware/async");
const Cashe = require('../models').Cashe;
const Lecture = require('../models').Lecture;
const User = require('../models').User;

// @desc      Get sports
// @route     GET /api/v1/sports
// @access    Public
exports.getCashes = asyncHandler(async (req, res, next) => {
  Cashe.findAll({
    include: [
      {
        model: User
      },
      {
        model: Lecture
      }
    ]
  })
  .then(cashes => {
    res.status(200).json(cashes)
  })
  .catch(err => {
    res.send("error: " + err)
  })
});


// @desc      Get single lectures
// @route     GET /api/v1/lectures/:id
// @access    Public
exports.getCashe = asyncHandler(async (req, res, next) => {
  const cashe = await Cashe.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User
      },
      {
        model: Lecture
      }
    ]
  })
  .catch(err => {
    res.send('error: ' + err)
  })

  res.status(200).json(cashe);
});