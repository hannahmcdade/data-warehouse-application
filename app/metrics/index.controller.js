(function(){
  'use strict';

  angular.module('app').controller('Metrics.IndexController', ['$scope', 'UserService',
  function($scope, UserService){
    // ViewModel - the controller instance variable
    var vm = this;
    vm.user = null;
    var status = 'status'

    var results = (function() {
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

    // Get each of the status types
    var uniqueStatus = [];
    angular.forEach(results, function(item) {
      var value = item.status;
      if(uniqueStatus.indexOf(value) === -1) {
        uniqueStatus.push(value);
      }
    });

    // Calculate the amount of each status types
    var uniqueStatusCount = [];
    var total = 0;
    for (var i = 0; i < uniqueStatus.length; i++) {
      for (var j = 0; j < results.length; j++) {
        if (uniqueStatus[i] === results[j].status) {
          total++;
        }
      }
      uniqueStatusCount.push(total);
      // Reset the total
      total = 0;
    }

    $scope.labels = uniqueStatus;
    $scope.data = uniqueStatusCount;

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
