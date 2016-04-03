(function(){
  'use strict';

  angular.module('app').controller('Metrics.IndexController', ['$scope', 'UserService',
  function($scope, UserService){
    // ViewModel - the controller instance variable
    var vm = this;
    vm.user = null;
    var status = 'status';

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

    // Get each date
    var dates = [];
    angular.forEach(results, function(item) {
      dates.push(item.date);
    });

    var rowCount = [];
    angular.forEach(results, function(item) {
      rowCount.push(item.row_count);
    });

    var newRowCount = [];
    newRowCount.push(rowCount);

    // Get each of the corresponding row counts

    $scope.statusLabels = uniqueStatus;
    $scope.statusData = uniqueStatusCount;
    $scope.colours = ['#FF8080', '#FFB84D', '#79D279'];

    $scope.dateLabels = dates;
    $scope.rowCountData = newRowCount;
    $scope.series = ['Weeks'];

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
