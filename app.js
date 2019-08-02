require('dotenv').config(); // load .env file 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var expressLayouts = require('express-ejs-layouts');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  var bcrypt = require('bcryptjs');
var MySQLStore = require('express-mysql-session')(session);


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var locationRouter = require('./routes/locations');
var categoryRouter = require('./routes/categories');
var brandRouter = require('./routes/brands');
var userRouter = require('./routes/users');
var productRouter = require('./routes/products');
var newsRouter = require('./routes/news');

var models = require('./models');
var app = express();
// promise way 
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, done) {
    models.User.findOne({ where: {email:email} }).then((user) => {
    
      if (!user) {
        console.log("user not found!");
        return done(null, false, 'User not found.');
      }

      if(user.role===models.User.CUSTOMER){
        return done(null, false, 'System User not found.');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  models.User.findById(id).then(user => {
    cb(null, user);
  }) 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/backend');

var options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'SomethingThatSomebodyShouldNotKnow',
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


app.use(function( req, res, next){
  // app title to view
  res.locals.title = process.env.APP_NAME;

  //user
  res.locals.user = req.user || null;
  //flash messages to view 
  res.locals.errors = req.flash("errors");
  res.locals.infos  = req.flash("infos");
  res.locals.error = req.flash("error");
  next();
});


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/locations',locationRouter);
app.use('/categories',categoryRouter);
app.use('/brands',brandRouter);
app.use('/users',userRouter);
app.use('/products',productRouter);
app.use('/news',newsRouter);

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
  if(err.status==404){
    res.render('404');
  }else{
    res.render('error');
  }
});

module.exports = app;
