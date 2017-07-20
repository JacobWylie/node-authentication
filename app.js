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

// ExpressJS/Mongoose Session Storage
app.use(require('express-session')({
	secret: "I'm on a mexican radio",
	resave: false,
	saveUninitialized: false
}))

// Use passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Uses local db strategy for user authentication
passport.use(new LocalStrategy(User.authenticate()));
// Encodes session data
passport.serializeUser(User.serializeUser());
// Decodes session data
passport.deserializeUser(User.deserializeUser());

// Body parser for POST data
app.use(bodyParser.urlencoded({extended: true}));

// EJS Templating
app.set('view engine', 'ejs');


/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////

// ROOT Route
app.get('/', (req, res) => res.render('home'));

// Secret Route
app.get('/secret', (req, res) => res.render('secret'));


// AUTHENTICATION ROUTES

// Show sign up form
app.get('/register', (req, res) => res.render('register'));
// Handles user signup
app.post('/register', (req, res) => {
	req.body.username
	req.body.password
	// Make a new user object
	// Save only username to database
	// Passes the password to User.register
	// User.register will hash the password
	// Returns new user with name and hashed password
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err) {
			console.log(err);
			return res.render('register');
		}
		// Logs user in with new user info
		// Uses local 'strategy'
		passport.authenticate('local')(req, res, () => res.redirect('/secret'));
	});
});


// LOGIN ROUTES

// Login form
app.get('/login', (req, res) => res.render('login'));

app.post('/login', passport.authenticate('local', {
	successRedirect: '/secret',
	failureRedirect: '/login'
}), (req, res) => console.log('yo'));

/////////////////////////////////////////////
// Server
/////////////////////////////////////////////

//local server
app.listen(3000, () => console.log('App running on localhost:3000'));
























