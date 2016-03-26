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

    // var json = (function() {
    //     var json = null;
    //     $.ajax({
    //         'async': false,
    //         'global': false,
    //         'url': "/content.json",
    //         'dataType': "json",
    //         'success': function (data) {
    //             json = data;
    //         }
    //     });
    //     return json;
    // })();

    initController();

    function initController() {
      // Get the current user
      UserService.GetCurrent().then(function(user) {
        vm.user = user;
      });

    }
  }]);
}());


// angular.module('scopeExample', [])
// .controller('MyController', ['$scope', function($scope) {
//   $scope.username = 'World';
//
//   $scope.sayHello = function() {
//     $scope.greeting = 'Hello ' + $scope.username + '!';
//   };
// }]);












// (function(){
//   'use strict';
//
//   angular.module('app').controller('Home.IndexController', Controller);
//
//   function Controller(UserService) {
//     // ViewModel - the controller instance variable
//     var vm = this;
//
//     vm.user = null;
//
//     $scope.results = [];
//     $scope.results = require('/dataApi/results.json');
//
//     initController();
//
//     function initController() {
//       // Get the current user
//       UserService.GetCurrent().then(function(user) {
//         vm.user = user;
//       });
//       console.log('printing the json data');
//       console.log($scope.results);
//     }
//
//   }
// }());
