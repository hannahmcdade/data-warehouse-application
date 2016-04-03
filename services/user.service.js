// Import modules
var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var usersDb = db.get('users');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(email, password) {
  var deferred = Q.defer();

  usersDb.findOne({ email: email }, function (err, user) {
    if (err) deferred.reject(err);

    if (user && bcrypt.compareSync(password, user.hash)) {
      // Authentication was successful
      deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
    } else {
      // Authentication failed
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  usersDb.findById(_id, function (err, user) {
    if (err) deferred.reject(err);

    if (user) {
      // Return the user, without a hashed password
      deferred.resolve(_.omit(user, 'hash'));
    } else {
      // The user not found
      deferred.resolve();
    }
  });

    return deferred.promise;
}

function create(userParam) {
  var deferred = Q.defer();

  // function to validate a users email address
  function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  // function to validate a users password
  function validatePassword(password) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return regex.test(password);
  }

  function createUser() {
    // Set the user object to userParam without the cleartext password
    var user = _.omit(userParam, 'password');

    // Add hashed password to the user object
    user.hash = bcrypt.hashSync(userParam.password, 10);

    usersDb.insert(user, function (err, doc) {
      if (err) deferred.reject(err);
      deferred.resolve();
    });
  }

  // ensure a valid email address is input
  if (!validateEmail(userParam.email)) {
    deferred.reject('Email "' + userParam.email + '" is not valid');
  }
  // ensure a valid password is input
  else if (!validatePassword(userParam.password)) {
    deferred.reject('Password must contain one uppercase, one lowercase, one digit and be at least 8 characters long');
  } else {
    // Server side validation - check if email already exists
    usersDb.findOne({ email: userParam.email },function (err, user) {
      if (err) deferred.reject(err);

      if (user) {
        // The email address already exists
        deferred.reject('Email "' + userParam.email + '" is already taken');
      } else {
        createUser();
      }
    });
  }

  return deferred.promise;
}

function update(_id, userParam) {
  var deferred = Q.defer();

  // Validation
  usersDb.findById(_id, function (err, user) {
    if (err) deferred.reject(err);

    if (user.email !== userParam.email) {
      // Email has changed, check if the new email is already taken
      usersDb.findOne({ email: userParam.email }, function (err, user) {
        if (err) deferred.reject(err);

        if (user) {
          // Email already exists
          deferred.reject('Email "' + req.body.email + '" is already in use')
        } else {
          updateUser();
        }
      });
    } else {
      updateUser();
    }
  });

  function updateUser() {
    // fields to update
    var set = {
      firstName: userParam.firstName,
      lastName: userParam.lastName,
      email: userParam.email,
    };

    // Update password if it was entered
    if (userParam.password) {
      set.hash = bcrypt.hashSync(userParam.password, 10);
    }

    usersDb.findAndModify({ _id: _id }, { $set: set }, function (err, doc) {
      if (err) deferred.reject(err);
        deferred.resolve();
    });
  }

  return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  usersDb.remove({ _id: _id }, function (err) {
    if (err) deferred.reject(err);

    deferred.resolve();
  });

  return deferred.promise;
}
