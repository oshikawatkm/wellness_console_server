//const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require("../middleware/async");
const Reservation = require('../models').Reservation;
const Lecture = require('../models').Lecture;
const User = require('../models').User;
const Sport = require('../models').Sport;

// @desc      Get Reservation
// @route     GET /api/v1/reservations
// @access    Public
exports.getReservations = asyncHandler(async (req, res, next) => {
  Reservation.findAll({
    include: [
      {
        model: User
      },
      {
        model: Lecture, 
        include: [
          {
            model: Sport
          }
        ]
      }
    ]
  })
    .then(reservations => {
      res.status(200).json(reservations)
    })
    .catch(err => {
      res.send("error: " + err)
    })
});

// @desc      Get single reservation
// @route     GET /api/v1/reservations/:id
// @access    Public
exports.getReservation = asyncHandler(async (req, res, next) => {
  const reservation = await Reservation.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User
      },
      {
        model: Lecture, 
        include: [
          {
            model: Sport
          }
        ]
      }
    ]
  })
  .catch(err => {
    res.send('error: ' + err)
  })

  res.status(200).json(reservation);
});

// @desc      Get single reservations
// @route     GET /api/v1/lectures/:lecture_id/reservations
// @access    Private
exports.addReservation = asyncHandler(async (req, res, next) => {
  req.body.lecture = req.params.id;
  req.body.user = req.user.id;
  req.body.status = "0"

  const reservation = await Reservation.create(req.body);

  res.status(201).json(reservation);
});


// @desc      Delete single reservations
// @route     DELETE /api/v1/reservation
// @access    Private
exports.deleteReservation = asyncHandler(async (req, res, next) => {
    Reservation.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(reservation => {
      if(reservation.user_id !== req.user.id) {
        return res
          .status(401)
          .json({ notauthorized: 'User not authorized' });
      }

      reservation.destroy().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ reservation: 'No post found' }));
});