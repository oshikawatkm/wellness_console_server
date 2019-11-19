const express = require("express");
const {
  getCashes,
  getCashe
} = require('../controllers/cashes');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');


router.use(protect);
router
  .route('/')
  .get(getCashes);

router
  .route('/:id')
  .get(getCashe);

module.exports = router;