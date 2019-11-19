//const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models').User;
const Cashe = require('../models').Cashe;
const Reservation = require('../models').Reservation;

const validateSetCnsInput = require('../validation/set-cns');


// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({
    include: [{
      model: Reservation
    }]
  })
    .catch(err => {
      res.send('error: ' + err);
    })

  res.status(200).json(users);
});


// @desc      Get all users
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Reservation
    },
    {
      model: Cashe
    }],
  })
  .catch(err => {
    res.send('error: ' + err)
  })

  res.status(200).json(user);
});



// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json(data)
})


// @desc      Update user
// @route     POST /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateEditUserInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.update(
    { 
      name: req.body.name,
      email: req.body.email
    },
    {
      where: { id: req.params.id }
    }
  )
    .catch(err => {
      res.send('error: ' + err)
    })

  res.status(200).json({
    success: true,
    data: user
  });
});



// @desc      Update user
// @route     POST /api/v1/auth/users/:id/set-cns-info
// @access    Private/Admin
exports.setCnsInfo = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateSetCnsInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.update(
    { 
      cnsName: req.body.cnsName,
      cnsPassword: req.body.cnsPassword
    },
    {
      where: { id: req.params.id }
    }
  )
    .catch(err => {
      res.send('error: ' + err)
    })

  res.status(200).json({
    success: true,
    data: user
  });
})
