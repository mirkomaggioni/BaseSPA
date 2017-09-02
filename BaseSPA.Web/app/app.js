﻿(function(window, angular) {
  'use-strict';
  angular.module('app', ['ui.router', 'angular.filter', 'mainModule'])
    .config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/blogs');
      $locationProvider.hashPrefix('');
    }]);
})(window, window.angular);