(function(window, angular) {
  'use-strict';
  angular.module('app', ['ui.router', 'angular.filter', 'mainModule'])
    .config(function ($urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/home/blogs');
      $locationProvider.hashPrefix('');
    });
})(window, window.angular);