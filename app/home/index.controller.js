(function(){
  'use strict';

  angular.module('app').controller('Home.IndexController', Controller);

  function Controller(UserService) {
    // ViewModel - the controller instance variable
    var vm = this;

    vm.user = null;

    initController();

    function initController() {
      // Get the current user
      UserService.GetCurrent().then(function(user) {
        vm.user = user;
      });
    }

  }
}());
