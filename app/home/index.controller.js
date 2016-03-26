(function(){
  'use strict';

  angular.module('app').controller('Home.IndexController', ['$scope', 'UserService', function($scope, UserService){
    // ViewModel - the controller instance variable
    var vm = this;

    vm.user = null;

    $scope.results = (function() {
      var results = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': "dataApi/results.json",
        'dataType': "json",
        'success': function (data) {
            results = data;
        }
      });
      return results;
    })();

    initController();

    function initController() {
      // Get the current user
      UserService.GetCurrent().then(function(user) {
        vm.user = user;
      });

    }
  }]);
}());
