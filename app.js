var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const mongoose = require("mongoose");

var resourceRouter = require('./routes/resource');
var animalRouter = require('./routes/animal');  // Fixed variable name

require('dotenv').config();

const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error Connecting to MongoDB: ", err));

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function() { console.log("Connection to DB succeeded"); });

passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var AnimalsRouter = require('./routes/Animals');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');

var animal = require("./models/animal");

var Account =require('./models/account');

async function recreateDB() {
  await animal.deleteMany();
 
  let instance1 = new animal({
    AnimalName:"Cat",
 
    AnimalType:"mammal",
 
    AnimalColour:"gray"
  });

  let instance2 = new animal({
    AnimalName: "Eagle",
 
     AnimalType: "bird",
 
     AnimalColour: "brown"
  });

  let instance3 = new animal({
    AnimalName: "Turtle",
 
      AnimalType: "reptile",
 
      AnimalColour: "green"
  });

  instance1.save()
  .then(doc => { console.log("First object saved"); })
  .catch(err => { console.error(err); });

  instance2.save()
  .then(doc => { console.log("Second object saved"); })
  .catch(err => { console.error(err); });

  instance3.save()
  .then(doc => { console.log("Third object saved"); })
  .catch(err => { console.error(err); });
}

let reseed = true;

if (reseed) { recreateDB(); }

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Animal', AnimalsRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);

app.use('/Animals', AnimalsRouter);  // Updated variable name
app.use("/resource", resourceRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// passport config
// Use the existing connection
// The Account model

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser())

module.exports = app;