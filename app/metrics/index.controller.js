(function(){
  'use strict';

  angular.module('app').controller('Metrics.IndexController', ['$scope', 'UserService', 'chart.js', function($scope, UserService){
    // ViewModel - the controller instance variable
    var vm = this;

    vm.user = null;

    // $scope.results = (function() {
    //   var results = null;
    //   $.ajax({
    //     'async': false,
    //     'global': false,
    //     'url': "dataApi/results.json",
    //     'dataType': "json",
    //     'success': function (data) {
    //         results = data;
    //     }
    //   });
    //   return results;
    // })();

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
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
