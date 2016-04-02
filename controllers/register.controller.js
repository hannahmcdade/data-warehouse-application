// Import modules
var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
  res.render('register');
});

router.post('/', function(req, res) {
  // Register using the api to maintain clean seperation between layers
  request.post({
    url: config.apiUrl + '/users/register',
    form: req.body,
    json: true
  }, function (err, response, body) {
    if (err) {
      return res.render('register', {error: 'An error has occurred'});
    }

    if (response.statusCode !== 200) {
      return res.render('register', {
        error: response.body,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      });
    }

    // If no error, return to the login page with a success message
    req.session.success = 'Registration successful';
    return res.redirect('/login');
  });
});

module.exports = router;
