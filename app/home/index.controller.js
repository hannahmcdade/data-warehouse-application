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

    $scope.filter = {
      status: ['Erred', 'Complete', 'Overridden']
    };

    $scope.setFilter = function(type) {
        // Set the search type
        var index = $scope.filter.status.indexOf(type);
        if (index > -1) {
          $scope.filter.status.splice(index, 1);
        } else {
          $scope.filter.status.push(type);
        }
        console.log($scope.filter.status);
    };

    initController();

    function initController() {
      // Get the current user
      UserService.GetCurrent().then(function(user) {
        vm.user = user;
      });
    }
  }]);
}());
