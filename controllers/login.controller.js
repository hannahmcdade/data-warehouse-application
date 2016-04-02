// Import modules
var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
  // log the user out by removing the jwt token
  delete req.session.token;

  // move success message into local variable so it only appears once (single read)
  var viewData = { success: req.session.success };
  delete req.session.success;

  res.render('login', viewData);
});

router.post('/', function (req, res) {
  // Authenticate using the api
  // This maintains a clean seperation between layers
  request.post({
    url: config.apiUrl + '/users/authenticate',
    form: req.body,
    json: true
  }, function (error, response, body) {
    if (error) {
      // Let user know an error has occurred
      return res.render('login', { error: 'An error occurred' });
    }

    if (!body.token) {
      // Let user know that the email or password is incorrect
      return res.render('login', { error: 'Email or password is incorrect', email: req.body.email });
    }

    // Save JWT token in the session to make it available to the Angular app
    req.session.token = body.token;

    // redirect to returnUrl
    var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
    res.redirect(returnUrl);
  });
});

module.exports = router;
