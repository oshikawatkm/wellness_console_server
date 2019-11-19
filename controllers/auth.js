const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models').User;
const Cashe = require('../models').Cashe;
const Reservation = require('../models').Reservation;
const Lecture = require('../models').Lecture;
const Sport = require('../models').Sport;


const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateEditUserInput = require('../validation/edit-user');

// @desv      Register user 
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password
  });
  
  sendTokenResponse(user, 200, res);
});

// @desv      Login user 
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }


  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user = await User.findOne({ 
    where: {email: email},
    attributes: ['id','password']
   })

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  
  const isMatch = await user.matchPassword(password);

  // [TASK]: isMatch　is not good
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});


// @desv      Log user out / clear cookie
// @route     POST /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({data: {}});
});

// @desv      Log user out / clear cookie
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await  User.findOne({
    where: {
      id: req.user.id
    },
    include: [{
      model: Reservation,
      include: [
        {
          model: Lecture,
          include: [
            {
              model: Sport
            }
          ]
        }
      ]
    },
    {
      model: Cashe,
      include: [
        {
          model: Lecture,
          include: [
            {
              model: Sport
            }
          ]
        }
      ]
    }],
  }).catch(err => {
    res.send('error: ' + err)
  });

  res.status(200).json(user);
});

// @desv      Log user out / clear cookie
// @route     POST /api/v1/auth/:id/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  console.log(req.body.name)
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



// @desc      Reset password
// @route     POST /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (rec, res, next) => {
  const restPassword = crypto
    .createhash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    restPasswordToken,
    restPasswordExpire: { $gt: Date.now() }
  })

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400))
  }

  user.password = req.bosy.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await  user.save;

  sendTokenResponse(user, 200, res);
});


// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});


const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken(user);

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token: "Bearer " + token
    });
};