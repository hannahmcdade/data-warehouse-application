// (function(){
//   'use strict';
//
//   angular.module('app').controller('Metrics.IndexController', ['$scope', 'UserService', 'chart.js', function($scope, UserService){
//     // ViewModel - the controller instance variable
//     var vm = this;
//
//     vm.user = null;
//
//     // $scope.results = (function() {
//     //   var results = null;
//     //   $.ajax({
//     //     'async': false,
//     //     'global': false,
//     //     'url': "dataApi/results.json",
//     //     'dataType': "json",
//     //     'success': function (data) {
//     //         results = data;
//     //     }
//     //   });
//     //   return results;
//     // })();
//
//     $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
// $scope.series = ['Series A', 'Series B'];
// $scope.data = [
//   [65, 59, 80, 81, 56, 55, 40],
//   [28, 48, 40, 19, 86, 27, 90]
// ];
// $scope.onClick = function (points, evt) {
//   console.log(points, evt);
// };
//
//     // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
//     // $scope.chartData = [300, 500, 100];
//
//     initController();
//
//     function initController() {
//       // Get the current user
//       UserService.GetCurrent().then(function(user) {
//         vm.user = user;
//       });
//     }
//
//
//   }]);
// }());



// angular.module("app", ["chart.js"]).controller("Metrics.IndexController", function ($scope) {
//
//   $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
//   $scope.series = ['Series A', 'Series B'];
//   $scope.data = [
//     [65, 59, 80, 81, 56, 55, 40],
//     [28, 48, 40, 19, 86, 27, 90]
//   ];
//   $scope.onClick = function (points, evt) {
//     console.log(points, evt);
//   };
// });



angular.module("app")
  // Optional configuration
  // .config(['ChartJsProvider', function (ChartJsProvider) {
  //   // Configure all charts
  //   ChartJsProvider.setOptions({
  //     colours: ['#FF5252', '#FF8A80'],
  //     responsive: false
  //   });
  //   // Configure all line charts
  //   ChartJsProvider.setOptions('Line', {
  //     datasetFill: false
  //   });
  // }])
  .controller("Metrics.IndexController", ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.series = ['Series A', 'Series B'];
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };
  //
  // // Simulate async data update
  // $timeout(function () {
  //   $scope.data = [
  //     [28, 48, 40, 19, 86, 27, 90],
  //     [65, 59, 80, 81, 56, 55, 40]
  //   ];
  // }, 3000);
}]);
