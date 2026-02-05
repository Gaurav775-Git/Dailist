var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var connectdb=require('./config/user_account_db')
var user_register=require('./routes/register')
var user_profile=require('./routes/profile')
var user_post=require('./routes/userpost')
var getuser_post=require('./routes/getuserpost')
var user_login=require('./routes/login')
var user_image=require('./routes/imagepost')
var dailyLogRoutes = require("./routes/logs_route");
var user_posts=require('./routes/quotepost')
var chatRoutes = require('./routes/chat.route');
var messageRoutes = require('./routes/message.route');
var user_daily_task=require("./routes/dailytask")
var gettask = require("./routes/getdailytask")
var complete_task=require("./routes/taskcomplete")
var heatmap_user=require("./routes/heatmap")
var user_search= require("./routes/search")
var send_req_user= require("./routes/friendreq")

var app = express();
var http = require('http');
var server = http.createServer(app);  
var configureSocket = require('./socket.io');
var io = configureSocket(server);


dotenv.config();
connectdb();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ✅ CORS for Vite frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/",user_register)
app.use("/",user_profile)
app.use("/",user_post(io))
app.use("/",getuser_post)
app.use("/",user_login)
app.use("/",user_image(io))
app.use("/",user_posts(io))
app.use("/api/daily-log",dailyLogRoutes)
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);
app.use("/",user_daily_task)
app.use("/",gettask)
app.use("/",complete_task)
app.use("/",heatmap_user)
app.use("/",user_search)
app.use("/",send_req_user)

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app, server};
