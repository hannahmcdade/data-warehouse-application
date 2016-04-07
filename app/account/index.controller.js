(function () {
    'use strict';

    angular.module('app').controller('Account.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
      // ViewModel - the controller instance variable
      var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;

        initController();

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

        function initController() {
          // Get the current user
          UserService.GetCurrent().then(function (user) {
              vm.user = user;
          });
        }

        function saveUser() {
          // ensure a valid email address is input
          if (!validateEmail(vm.user.email)) {
            FlashService.Error('Email "' + vm.user.email + '" is not valid');
          }
          // ensure a valid password is input
          else if (!validatePassword(vm.user.password)) {
            FlashService.Error('Password must contain one uppercase, one lowercase, one digit and be at least 8 characters long');
          } else {
            // Server side validation - update user profile. Check for other errors.
            UserService.Update(vm.user).then(function () {
              FlashService.Success('User updated');
            }).catch(function (error) {
              FlashService.Error(error);
            });
          }
        }

        function deleteUser() {
          UserService.Delete(vm.user._id).then(function () {
            // Log the user out once profile has been deleted
            $window.location = '/login';
          }).catch(function (error) {
            FlashService.Error(error);
          });
        }
    }
})();
