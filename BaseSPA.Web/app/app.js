(function(window, angular) {
  'use-strict';
  angular.module('app', ['ui.router', 'angular.filter', 'mainModule'])
    .config(['$urlRouterProvider', function($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    }])
    .run(['$state', function ($state) {
      $state.go('main');
    }]);
})(window, window.angular);