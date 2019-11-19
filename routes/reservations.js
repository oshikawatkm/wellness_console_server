const express = require("express");
const {
  getReservations,
  getReservation,
  addReservation,
  deleteReservation
} = require('../controllers/reservations');

const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(getReservations)

router
  .route('/:id')
  .get(protect, getReservation)
  .post(protect, addReservation)
  .delete(protect, deleteReservation)

module.exports = router;