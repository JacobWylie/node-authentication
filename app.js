const express  				= require('express'),
	  app      				= express(),
	  mongoose  			= require('mongoose'),
	  passport              = require('passport'),
	  bodyParser            = require('body-parser'),
	  LocalStrategy         = require('passport-local'),
	  passportLocalMongoose = require('passport-local-mongoose'),
	  User 					= require('./models/user');

// Mongoose/MongoDB database
mongoose.connect("mongodb://localhost/node_auth_demo", {useMongoClient: true});


/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////

// ExpressJS/Mongoose Session Storage
app.use(require('express-session')({
	secret: "I'm on a mexican radio",
	resave: false,
	saveUninitialized: false
}))

// Use passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Encodes session data
passport.serializeUser(User.serializeUser());
// Decodes session data
passport.deserializeUser(User.deserializeUser());

// EJS Templating
app.set('view engine', 'ejs');

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////

// ROOT Route
app.get('/', (req, res) => res.render('home'));

// Secret Route
app.get('/secret', (req, res) => res.render('secret'));


/////////////////////////////////////////////
// Server
/////////////////////////////////////////////

//local server
app.listen(3000, () => console.log('App running on localhost:3000'));