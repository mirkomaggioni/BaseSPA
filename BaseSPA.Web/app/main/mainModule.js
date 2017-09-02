(function(window, angular) {
  'use-strict';
  angular.module('mainModule', ['ui.router', 'blogsModule', 'postsModule'])
    .config(function ($stateProvider) {
        var mainState = {
          name: 'home',
          url: '/home',
          views: {
            'header': { templateUrl: 'app/main/header.html' },
            'main': { templateUrl: 'app/main/main.html', controller: 'mainCtrl' }
          }
        }

        $stateProvider.state(mainState);
      })
    .controller('mainCtrl', function ($scope, $state) {
        $scope.$state = $state;
      });
})(window, window.angular)