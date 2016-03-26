(function(){
  'use strict';

  angular.module('app').controller('Header.IndexController', ['$scope', 'UserService', function($scope, UserService){
    // ViewModel - the controller instance variable
    var vm = this;

    // vm.user = null;
    $scope.vm = vm;

    initController();

    function initController() {
      // Get the current user
      UserService.GetCurrent().then(function(user) {
        $scope.vm.user = user;
      });
    }

  }]);
}());
