// Import required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('cors');
var logger = require('morgan');
const bodyParser = require('body-parser');

// Import controller
var indexRouter = require('./routes/IndexController');
const patientController = require('./routes/PatientController.js');
const physicianRoutes = require('./routes/PhysicianController');
const particleController = require('./routes/ParticleController');

// Initialize the express app
const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'https://ec2-18-217-163-243.us-east-2.compute.amazonaws.com:3001' }));

// This is to enable cross-origin access
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
// Routes
=======
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err : {},
  });
});


// // Set view engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs'); // Replace `ejs` with your view engine if different

>>>>>>> cd919b01809a196d8200c3240e029d160878bca6
app.use('/', indexRouter);
app.use('/patient', patientController);
app.use('/physician', physicianRoutes);
app.use('/particle', particleController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const error = req.app.get('env') === 'development' ? err : {};
  
  // send error as JSON instead of rendering a view
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: error
  });
});

module.exports = app;
