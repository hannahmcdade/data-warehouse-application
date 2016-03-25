// Import modules
var express = require('express');
var router = express.Router();

// Use session authentication to secure the angular app files
router.use('/', function(req, res, next) {
  if (req.path !== '/login' && !req.session.token) {
    return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
  }

  next();
});

// Make the JWT token available to the Angular app
router.get('/token', function(req, res) {
  res.send(req.session.token);
});

// Serve the Angular app files from the /app route
router.use('/', express.static('app'));

module.exports = router;
