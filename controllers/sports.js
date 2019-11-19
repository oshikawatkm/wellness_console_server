//const ErrorResponse = require('../utisl/errorResponse');
const asyncHandler = require('../middleware/async');
const Sport = require('../models').Sport;
const Lecture = require('../models').Lecture;

// @desc      Get sports
// @route     GET /api/v1/sports
// @access    Public
exports.getSports = asyncHandler(async (req, res, next) => {
  Sport.findAll()
    .then(sports => {
      res.status(200).json(sports)
    })
    .catch(err => {
      res.send("error: " + err)
    })
})

// @desc      Get single sports
// @route     GET /api/v1/sports/:id
// @access    Public
exports.getSport = asyncHandler(async (req, res, next) => {
  const sport = await Sport.findOne({
    where: {
      id: req.params.id
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })

  const lectures = await Lecture.findAll({
    where: {
      sport_id: sport.id
    },
    include: [
      {
        model: Sport
      },
    ]
  })

  res.status(200).json({
    sport: sport,
    lectures: lectures
  });
});



// @desc      Create Lectures
// @route     GET /api/v1/sports/createLectures
// @access    Public
exports.createAllLectures = asyncHandler(async (req, res, next) => {
  let sports = [];
  sports = await Sport.findAll()
  .catch(err => {
    res.send('error: ' + err)
  })

  sports.forEach(sport => {
    let i = 1;
    let this_lecture_num = sport.first_num;

    while ( i <= 14) {
      switch(sport.week) {
        case 'Monday':
          days = [190923, 190930, 191007, 191021, 191028, 191104, 191118, 191202, 191202, 191209, 191216, 191223, 200106, 200120];
          break;
        case 'Tuesday':
          days = [190924, 191001, 191008, 191015, 191029, 191105, 191112, 191126, 191203, 191210, 191217, 191224, 200107, 200114];
          break;
        case 'Wednesday':
          days = [190925, 191002, 191009, 191016, 191023, 191030, 191106, 191127, 191204, 191211, 191218, 191225, 200108, 200115]
          break;
        case 'Thursday':
          days = [190926, 191003, 191010, 191017, 191024, 191031, 191107, 191128, 191205, 191212, 191219, 191226, 200109, 200116]
          break;
        case 'Friday':
          days = [190927, 191004, 191011, 191018, 191025, 191101, 191108, 191115, 191129, 191206, 191213, 191220, 201227, 200117]
          break;
      } 
      let day = days[i-1].toString();
      let y, m, d; 
  
      y = '20' + day.slice(0,2);
  
      m = day.slice(2,4);
      m = parseInt(m) - 1;
  
      d = day.slice(4,6)
  
      let newLecture = Lecture.create({
        date: new Date(y, m, d),
        lecture: this_lecture_num,
        sport_id: sport.id,
        d: days[i-1]
      })
  
      this_lecture_num = sport.first_num + i;
      i++;
    }
  })

  res.status(200).json(data)
})





// @desc      Create Lectures
// @route     GET /api/v1/sports/:id/createLectures
// @access    Public
exports.createLectures = asyncHandler(async (req, res, next) => {
  const sport = await Sport.findOne({
    where: {
      id: req.params.id
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })

  let this_lecture_num = sport.first_num;

  let i = 1;
  while ( i <= 14) {
    switch(sport.week) {
      case 'Monday':
        days = [190923, 190930, 191007, 191021, 191028, 191111, 191118, 191202, 191202, 191202, 191209, 191216, 191223, 200106];
        break;
      case 'Tuesday':
        days = [190924, 191001, 191008, 191015, 191029, 191105, 191112, 191126, 191203, 191210, 191217, 191224, 200107, 200114];
        break;
      case 'Wednesday':
        days = [190925, 191002, 191009, 191016, 191023, 191030, 191106, 191127, 191204, 191211, 191218, 191225, 200108, 209115]
        break;
      case 'Thursday':
        days = [190926, 191003, 191010, 191017, 191024, 191031, 191107, 191128, 191205, 191212, 191219, 191226, 200109, 200116]
        break;
      case 'Friday':
        days = [190927, 191004, 191011, 191018, 191025, 191101, 191108, 191115, 191129, 191206, 191213, 191220, 201227, 200117]
        break;
    } 
    let day = days[i-1].toString();
    let y, m, d; 

    y = day.slice(0,2);

    m = day.slice(2,4);
    m = parseInt(m) - 1;

    d = day.slice(4,6)

    let newLecture = await Lecture.create({
      date: new Date(y, m, d),
      lecture: this_lecture_num,
      sport_id: sport.id,
      d: days[i-1]
    })

    this_lecture_num = sport.first_num + i;
    i++;
  }

  res.status(200).json()
})
