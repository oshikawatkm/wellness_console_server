const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

const auth = require('./routes/auth');
const users = require('./routes/users');
const sports = require('./routes/sports');
const lectures = require('./routes/lectures');
const cashes = require('./routes/cashes');
const reservations = require('./routes/reservations');

const app = express();

app.use(express.json());

app.use(cookieParser());



app.use(helmet());
app.use(xss());
app.use(cors());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);
app.use(hpp());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/sports', sports);
app.use('/api/v1/lectures', lectures);
app.use('/api/v1/cashes', cashes);
app.use('/api/v1/reservations', reservations);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`.yellow.bold));