var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
var dotenv=require('dotenv')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var connectdb=require('./config/user_account_db')
var user_register=require('./routes/register')
var user_profile=require('./routes/profile')
var user_post=require('./routes/userpost')
var getuser_post=require('./routes/getuserpost')
var user_login=require('./routes/login')
var user_image=require('./routes/imagepost')
var user_posts=require('./routes/quotepost')

var app = express();
 connectdb()
 dotenv.config()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(
  {
    origin:"http://localhost:5173",
    method:["GET","POST","DELETE","UPDATE","PUT"],
    credentials:true
  }
))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/",user_register)
app.use("/",user_profile)
app.use("/",user_post)
app.use("/",getuser_post)
app.use("/",user_login)
app.use("/",user_image)
app.use("/",user_posts)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
