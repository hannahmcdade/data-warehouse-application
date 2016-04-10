// The entry point into the nodejs application.
// Defines app wide settings, binds controllers to routes and starts the http server.

// Import modules
require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var path = require("path");

// Use EJS to create templates/views (used instead of Jade).
// Use EJS to include repeatable parts of the site (partials) and pass data to the views.
// Allow rendering engine to read ejs (embedded javascript)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// Use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// Routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// Serve the statis file
app.use(express.static(path.join(__dirname, 'views')));

// Make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// Start the server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
