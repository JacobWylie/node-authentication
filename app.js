const express  = require('express'),
	  app      = express(),
	  mongoose = require('mongoose');

// Mongoose/MongoDB database
mongoose.connect("mongodb://localhost/node_auth_demo");

// EJS Templating
app.set('view engine', 'ejs');

// ROOT Route
app.get('/', (req, res) => res.render('home'));

// Secret Route
app.get('/secret', (req, res) => res.render('secret'));

//local server
app.listen(3000, () => console.log('App running on localhost:3000'));