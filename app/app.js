(function() {
  'use strict';

  angular.module('app', ['ui.router'])
  .config(config)
  .run(run);

  function config($stateProvider, $urlRouterProvider) {
    // Default route
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/index.html',
      controller: 'Home.IndexController',
      controllerAs: 'vm',
      data: {activeTab: 'home'}
    })
    .state('account', {
      url: '/account',
      templateUrl: 'account/index.html',
      controller: 'Account.IndexController',
      controllerAs: 'vm',
      data: {activeTab: 'account'}
    });
  }

  function run($http, $rootScope, $window) {
    // Add JWT token as default to authentication header
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

    // Update active tab on state change
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $rootScope.activeTab = toState.data.activeTab;
    });
  }

  // Manually bootstrap Angular after the JWT token is retrieved from the server
  $(function() {
    // Get the JWT token from the server
    $.get('/app/token', function(token) {
      window.jwtToken = token;
      angular.bootstrap(document, ['app']);
    });
  });

})();
